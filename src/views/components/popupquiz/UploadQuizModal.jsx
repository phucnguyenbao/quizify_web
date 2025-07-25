import React, { useEffect, useState } from 'react';
import '../../../assets/css/popupgamequiz/AddGame.css';
import * as XLSX from 'xlsx';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/services';
import { v4 as uuidv4 } from 'uuid';

const UploadQuizModal = ({ onClose, user }) => {
  const [file, setFile] = useState(null);
  const [sheetData, setSheetData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

const handleFileChange = async (event) => {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;

  setFile(selectedFile);

  try {
    const data = await selectedFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

    const cleanedSheet = [];
    const errorRows = [];
    const correctFieldNames = ['Answer_1', 'Answer_2', 'Answer_3', 'Answer_4', 'Answer_5'];

    sheet.forEach((row, index) => {
      // Bỏ qua dòng hoàn toàn trống
      const values = Object.values(row).map(cell => String(cell).trim());
      const isEmptyRow = values.every(val => val === '');
      if (isEmptyRow) {
  cleanedSheet.push({}); // Giữ dòng trống để phân nhóm
  return;
}

      const quizName = row.Quiz_name?.trim();
      const topic = row.Topic?.trim();
      const questionContent = row.Question_content?.trim();
      const questionType = row.Question_type?.trim();
      const correctRaw = row.Correct_answer?.trim();

      const answers = [
        row.Answer_1?.trim(),
        row.Answer_2?.trim(),
        row.Answer_3?.trim(),
        row.Answer_4?.trim(),
        row.Answer_5?.trim()
      ];

      let isValid = true;
      let errorMessage = '';

      if (!quizName || !topic) {
        isValid = false;
        errorMessage = 'Thiếu Quiz_name hoặc Topic';
      } else if (!questionContent || !['one_choice', 'multiple_choice'].includes(questionType)) {
        isValid = false;
        errorMessage = 'Thiếu hoặc sai Question_content / Question_type';
      } else if (!answers[0]) {
        isValid = false;
        errorMessage = 'Thiếu Answer_1';
      } else {
        for (let i = 1; i < answers.length; i++) {
          if (answers[i] && !answers[i - 1]) {
            isValid = false;
            errorMessage = `Answer_${i + 1} tồn tại nhưng thiếu Answer_${i}`;
            break;
          }
        }
      }

      if (isValid && correctRaw) {
        const correctAnswers = correctRaw.split(',').map(a => a.trim());
        const allValidFields = correctAnswers.every(c => correctFieldNames.includes(c));
        if (!allValidFields) {
          isValid = false;
          errorMessage = `Correct_answer không hợp lệ. Chỉ được dùng tên như Answer_1,...`;
        } else {
          for (const c of correctAnswers) {
            const idx = parseInt(c.split('_')[1], 10) - 1;
            if (!answers[idx]) {
              isValid = false;
              errorMessage = `Correct_answer "${c}" chỉ tới một đáp án rỗng.`;
              break;
            }
          }
        }
      }

      if (isValid) {
        cleanedSheet.push(row);
      } else {
        errorRows.push(`Dòng ${index + 2}: ${errorMessage}`);
      }
    });

    if (errorRows.length > 0) {
      alert(
        `⚠️ Có ${errorRows.length} dòng bị loại:\n\n` +
          errorRows.slice(0, 10).join('\n') +
          (errorRows.length > 10 ? `\n... và ${errorRows.length - 10} dòng nữa.` : '')
      );
    }

    if (cleanedSheet.length === 0) {
      alert('❌ Không có dòng nào hợp lệ. Vui lòng kiểm tra lại file.');
    }

    setSheetData(cleanedSheet);
  } catch (err) {
    console.error('❌ Lỗi khi đọc file:', err);
    alert('❌ Không thể đọc file. Hãy chắc chắn rằng file có định dạng .xlsx hợp lệ.');
  }
};


  const handleUpload = async () => {
    if (!file || sheetData.length === 0) {
      alert('❌ Chưa có dữ liệu để upload.');
      return;
    }

    try {
      setIsUploading(true);

      const groupedByQuiz = {};
      for (const row of sheetData) {
        const quizName = row.Quiz_name?.trim();
        const topic = row.Topic?.trim();
        if (!quizName || !topic) continue;

        const key = `${quizName}_${topic}`;
        if (!groupedByQuiz[key]) groupedByQuiz[key] = [];
        groupedByQuiz[key].push(row);
      }

      for (const [key, questions] of Object.entries(groupedByQuiz)) {
        const first = questions[0];
        const quizName = first.Quiz_name || '';
        const topic = first.Topic || '';
        const count = questions.length;
        const quizId = uuidv4().slice(0, 8);
        const creationDate = new Date().toISOString().slice(0, 10);

        await setDoc(doc(db, 'quiz', quizId), {
          Quiz_id: quizId,
          Quiz_name: quizName,
          Topic: topic,
          Question_count: count,
          Average_score: 0,
          Attempted_users: 0,
          Selection_count: 0,
          Creator_id: user?.member_id || '',
          Creation_date: creationDate
        });

        for (let i = 0; i < questions.length; i++) {
          const q = questions[i];
          await addDoc(collection(db, 'ques'), {
            Quiz_id: quizId,
            Question_id: `${quizId}_Q${i + 1}`,
            Question_content: q.Question_content || '',
            Question_type: q.Question_type || '',
            Question_image: q.Question_image || '',
            Answer_1: q.Answer_1 || '',
            Answer_2: q.Answer_2 || '',
            Answer_3: q.Answer_3 || '',
            Answer_4: q.Answer_4 || '',
            Answer_5: q.Answer_5 || '',
            Correct_answer: q.Correct_answer || ''
          });
        }
      }

      alert('✅ Upload thành công!');
      onClose();
    } catch (err) {
      console.error('❌ Upload thất bại:', err);
      alert('❌ Có lỗi khi upload. Vui lòng kiểm tra lại kết nối hoặc dữ liệu.');
    } finally {
      setIsUploading(false);
    }
  };
const groupedByGap = (() => {
  const groups = [];
  let currentGroup = [];
  for (let i = 0; i < sheetData.length; i++) {
    const row = sheetData[i];
    const isEmpty = Object.values(row).every(cell => String(cell).trim() === '');

    if (isEmpty && currentGroup.length > 0) {
      groups.push(currentGroup);
      currentGroup = [];
    } else {
      currentGroup.push(row);
    }
  }
  if (currentGroup.length > 0) {
    groups.push(currentGroup); // Đừng quên nhóm cuối
  }

  return groups.map((group, index) => [
    `Quiz #${index + 1} (${group[0]?.Quiz_name || 'Unnamed'} - ${group[0]?.Topic || 'No topic'})`,
    group,
  ]);
})();


  return (
    <div className="modal-overlay" onClick={onClose}>
 <div
  className="ai-modal"
  style={{
    position: 'fixed',
    top: '5vh',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
    width: 'auto',             // 🔑 Mở rộng tự nhiên theo nội dung
    minWidth: '1500px',        // 🔑 Bảng bạn cần ít nhất 1200px để không bị scroll
    
    maxHeight: '90vh',
    overflowY: 'auto',
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxSizing: 'border-box'
  }}
  onClick={(e) => e.stopPropagation()}
>

        <h2 className="modal-title">Upload Quiz from File</h2>
        <div className="modal-body">
          <p>Please select a file to upload (.xlsx)</p>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          {file && <div className="selected-file">Selected file: <strong>{file.name}</strong></div>}
        </div>
        <div className="modal-footer" style={{ marginTop: '20px' }}>
          <button className="gradient-button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button className="secondary-button" onClick={onClose}>Cancel</button>
        </div>

        {sheetData.length > 0 && (
          <div className="preview-wrapper" style={{ marginTop: '20px' }}>
<h4 style={{ color: '  #0ddba4ff', fontSize: '24px', fontWeight: 'bold' }}>
  📄 Preview dữ liệu theo từng quiz
</h4>

{groupedByGap.map(([quizKey, questions], index) => (
              <div key={index} style={{ marginBottom: '30px' }}>
<h5 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
  {quizKey}
</h5>


                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Topic</th>
                        <th>Quiz_name</th>
                        <th>Question_image</th>
                        <th>Question_content</th>
                        <th>Question_type</th>
                        <th>Answer_1</th>
                        <th>Answer_2</th>
                        <th>Answer_3</th>
                        <th>Answer_4</th>
                        <th>Answer_5</th>
                        <th>Correct_answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questions.map((q, i) => (
                        <tr key={i}>
                          <td>{q.Topic || ''}</td>
                          <td>{q.Quiz_name || ''}</td>
                          <td>{q.Question_image || ''}</td>
                          <td>{q.Question_content || ''}</td>
                          <td>{q.Question_type || ''}</td>
                          <td>{q.Answer_1 || ''}</td>
                          <td>{q.Answer_2 || ''}</td>
                          <td>{q.Answer_3 || ''}</td>
                          <td>{q.Answer_4 || ''}</td>
                          <td>{q.Answer_5 || ''}</td>
                          <td>{q.Correct_answer || ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadQuizModal;
