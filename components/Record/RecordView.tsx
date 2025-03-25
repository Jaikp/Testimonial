import { Rating } from '@material-tailwind/react';
import React, { useState, useRef, useEffect } from 'react';

const RecorderView = ({spaceId, setUpload} :{spaceId : any,setUpload:any}) => {
  const [status, setStatus] = useState<string>('Idle');
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startRecording = async () => {
    try {
      setStatus('Recording...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          const url = URL.createObjectURL(event.data);
          setMediaBlobUrl(url);
        }
      };

      mediaRecorderRef.current.start();
    } catch (err) {
      console.error('Error accessing media devices.', err);
      setStatus('Error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setStatus('Stopped');
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const uploadVideo = async () => {
    if (mediaBlobUrl) {
      try {
        setStatus('Uploading');
        
        // Fetch the blob from the mediaBlobUrl
        const response = await fetch(mediaBlobUrl);
        const blob = await response.blob();
        
        // Create FormData and append the file
        const formData = new FormData();
        formData.append('video', blob, 'recording.webm');
        formData.append('spaceId', spaceId);
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('rating', form.rating);
        
        // Send to your API endpoint
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          // Don't set Content-Type header - the browser will set it automatically with the boundary
        });
  
        if (!uploadResponse.ok) throw new Error('Upload failed');
        
        const data = await uploadResponse.json();
        console.log('Upload success:', data.url);
        setStatus('Uploaded');
      } catch (error) {
        console.error('Upload error:', error);
        setStatus('Upload Failed');
      }
    }
  };
  

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
    const [form, setForm] = useState({
      spaceId : spaceId,
      name : "",
      email : "",
      content : "",
      rating : "5",
      videoUrl : "null"
    })

  const handleChange = (e : any) => {
    e.preventDefault();

    const { name, value} = e.target;

    const newValue = value;

    setForm(prevForm => ({
      ...prevForm,
      [name]: newValue
    }));
  };

  const handleRatingChange = (value: number) => {
    setForm(prevForm => ({
      ...prevForm,
      rating: value.toString()
    }));
  };
  if(status === 'Uploaded'){
    setUpload('');
  }

  return (
    <>
      <Rating value={Number(form.rating)} onChange={handleRatingChange} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  />
      {status === 'Recording...' && (
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
        />
      )}
      {mediaBlobUrl && (
        <div>
          <video
            src={mediaBlobUrl}
            controls
            autoPlay
            loop
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </div>
      )}
      <div className='flex justify-center gap-5'>
        <button className='bg-teal-700 text-white p-2 rounded' hidden={status === 'Recording...' || status === 'Stopped'} onClick={startRecording}>Start Recording</button>
        <button className='bg-teal-700 text-white p-2 rounded' hidden={status !== 'Recording...'} onClick={stopRecording}>Stop Recording</button>
      </div>
      <p className='mt-4 font-light text-sm'>Your Name</p>
              <input onChange={handleChange} name='name' className='w-full border rounded bg-white p-2' required></input>
              <p className='mt-4 font-light text-sm'>Your Email</p>
              <input onChange={handleChange} name='email' className='w-full border rounded bg-white p-2' required></input>

              <div className='flex mt-4'>
                <div className='bg-white mr-2'>
                  <input className='bg-white border rounded' type='checkbox' required></input>
                </div>
                <div className='font-light  text-sm'>I give permission to use this testimonial across social channels and other marketing efforts</div>
              </div>
              <div className='flex justify-end mt-2'>   
          <button onClick={uploadVideo} disabled={status === 'Uploading'} className='bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded'>submit</button>
        </div> 
    </>
  );
};

export default RecorderView;
