const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// 🔹 Import JSON data
const dataToUpload = require("./data/rope.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function uploadData() {
  const ropeRef = db.collection("rope");

  try {
    const snapshot = await ropeRef.get();

    if (snapshot.empty) {
      console.log("ℹ️ Collection 'rope' chưa có document nào. Sẽ tạo mới...");
    } else {
      console.log(`ℹ️ Collection 'rope' đã tồn tại với ${snapshot.size} document(s). Sẽ ghi thêm...`);
    }

    const batch = db.batch();

    dataToUpload.forEach((item, idx) => {
      const ref = ropeRef.doc(`upload_${idx + 1}`);
      batch.set(ref, item);
    });

    await batch.commit();
    console.log("✅ Upload thành công vào collection 'rope'");
  } catch (err) {
    console.error("❌ Lỗi upload:", err);
  }
}

uploadData();
