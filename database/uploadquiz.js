const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// 🔹 Import JSON data
const dataToUpload = require("./data/quiz.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadData() {
  const quizRef = db.collection("quiz");

  try {
    const snapshot = await quizRef.get();

    if (snapshot.empty) {
      console.log("ℹ️ Collection 'quiz' chưa có document nào. Sẽ tạo mới...");
    } else {
      console.log(`ℹ️ Collection 'quiz' đã tồn tại với ${snapshot.size} document(s). Sẽ ghi thêm...`);
    }

    const batch = db.batch();

    dataToUpload.forEach((item, idx) => {
      const ref = quizRef.doc(`quiz_${idx + 1}`);
      batch.set(ref, item);
    });

    await batch.commit();
    console.log("✅ Upload thành công vào collection 'quiz'");
  } catch (err) {
    console.error("❌ Lỗi upload:", err);
  }
}

uploadData();
