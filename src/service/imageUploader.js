const cloudName = process.env.VUE_APP_CLOUD_NAME;
const uploadPreset = process.env.VUE_APP_UPLOAD_PRESET;

async function imageUpload(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', uploadPreset);
  const result = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: 'POST',
      body: data,
    },
  );
  return await result.json();
}

export { imageUpload };
