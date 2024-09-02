import React, { useState, useRef, useEffect } from 'react';

const RecorderView: React.FC = () => {
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
        const blob = await fetch(mediaBlobUrl).then(res => res.blob());
        const file = new File([blob], 'recording.webm', { type: 'video/webm' });
  
        const formData = new FormData();

        formData.append('video', blob);
        console.log(formData);
  
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Upload success:', data);
      } catch (error) {
        console.error('Upload error:', error);
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

  return (
    <>
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
          <button onClick={uploadVideo} className='bg-teal-700 text-white p-2 rounded'>
            Upload Video
          </button>
        </div>
      )}

      <p>{status}</p>
      <div className='flex justify-center gap-5'>
        <button className='bg-teal-700 text-white p-2 rounded' onClick={startRecording}>Start Recording</button>
        <button className='bg-teal-700 text-white p-2 rounded' onClick={stopRecording}>Stop Recording</button>
      </div>
    </>
  );
};

export default RecorderView;
