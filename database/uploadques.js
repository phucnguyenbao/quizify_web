const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// 🔹 Import JSON data
const dataToUpload = require("./data/ques.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadData() {
  const quesRef = db.collection("ques");

  try {
    const snapshot = await quesRef.get();

    if (snapshot.empty) {
      console.log("ℹ️ Collection 'ques' chưa có document nào. Sẽ tạo mới...");
    } else {
      console.log(`ℹ️ Collection 'ques' đã tồn tại với ${snapshot.size} document(s). Sẽ ghi thêm...`);
    }

    const batch = db.batch();

    dataToUpload.forEach((item, idx) => {
      const ref = quesRef.doc(`ques_${idx + 1}`);
      batch.set(ref, item);
    });

    await batch.commit();
    console.log("✅ Upload thành công vào collection 'ques'");
  } catch (err) {
    console.error("❌ Lỗi upload:", err);
  }
}

uploadData();
