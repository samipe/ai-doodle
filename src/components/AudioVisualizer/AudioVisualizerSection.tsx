import { useEffect, useRef, useState } from 'react';
import './AudioVisualizerSection.css';

const AudioVisualizerSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);

  const start = async () => {
    if (started) return;
    setStarted(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        const barWidth = canvas.width / bufferLength;
        for(let i=0;i<bufferLength;i++){
          const val = dataArray[i] / 255;
          const barHeight = val * canvas.height;
          const hue = (i / bufferLength) * 360;
          ctx.fillStyle = `hsl(${hue},70%,50%)`;
          ctx.fillRect(i*barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
        }
      };
      draw();
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <section className="audio-visualizer-section">
      <h1>Mic Visualizer</h1>
      <canvas ref={canvasRef} width={600} height={200}></canvas>
      {!started && (
        <button onClick={start}>Start</button>
      )}
    </section>
  );
};

export default AudioVisualizerSection;
