import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../configs/firebase.js";

const firebaseHelper = {
    /**
   *
   * @param {String} userId
   * @param {File[]} files
   * @returns {Promise<String[]>}
   */

    uploadToStorage: async ({displayName, productCode}, files = []) => {
        const datas = await Promise.all(
            files.map((file, index) => {
                let folder = `${displayName}/${productCode.toLocaleUpperCase()}-${index}`;
                const fileRef = ref(
                    storage,
                    folder
                );
                return uploadBytes(fileRef, file.buffer, {
                    contentType: file?.mimetype || "image/jpeg",
                });
            })
        );

        const urls = await Promise.all(
            datas.map((data) => getDownloadURL(data.ref))
        );

        return urls;
    }
}

export default firebaseHelper;