import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadFile(file: File, path: string = 'uploads') {
  try {
    // Create a unique filename
    const filename = `${Date.now()}-${file.name}`
    // Create reference
    const storageRef = ref(storage, `${path}/${filename}`)
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get download URL
    const url = await getDownloadURL(snapshot.ref)
    
    return url
  } catch (error) {
    console.error('Error uploading file:', error)
    throw new Error('Failed to upload file')
  }
}
