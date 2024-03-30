import { io } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import axios from '@/config/axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const socket = io('http://localhost:9002');

const Deploy = () => {
  const location = useLocation();
  const { repoId } = useParams();
  const url = location.state.cloneUrl;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
    'Hello',
    'Welcome',
  ]);

  const logContainerRef = useRef<HTMLElement>(null);

  const handleClickDeploy = useCallback(async () => {
    setLoading(true);

    const { data } = await axios.post(`/project`, {
      gitURL: url,
      projectSlug: repoId,
    });

    if (data && data.data) {
      const { url } = data.data;

      setPreviewUrl(url);

      console.log(`Subscribing to logs:${repoId}`);
      socket.emit('subscribe', `logs:${repoId}`);
    }
  }, [repoId, url]);

  const handleSocketIncommingMessage = useCallback((message: string) => {
    console.log(`[Incomming Socket Message]:`, typeof message, message);
    const { log } = JSON.parse(message);
    setLogs((prev) => [...prev, log]);
    logContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    socket.on('message', handleSocketIncommingMessage);

    return () => {
      socket.off('message', handleSocketIncommingMessage);
    };
  }, [handleSocketIncommingMessage]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-1.5 md:text-center">
        <h1 className="font-medium text-3xl lg:text-4xl">
          Let's Lift your Code
        </h1>
        <h3 className="text-sm text-primary/60">
          Get started by clicking on the deploy button
        </h3>
      </div>
      <div className="w-full flex justify-center">
        <div className="border rounded-md w-full md:w-4/5 lg:w-2/3">
          <div className="flex flex-col lg:flex-row p-4 lg:px-12 lg:py-8 gap-4">
            <div className="w-full lg:w-1/2 rounded-md flex flex-col gap-4">
              <div className="h-40 border"></div>
              <Button className="w-full" onClick={handleClickDeploy}>
                {loading ? 'Deploying' : 'Deploy'}
              </Button>
            </div>
            <div className="w-full lg:w-1/2">
              {logs.length > 0 && (
                <div className={`rounded-lg h-[300px] overflow-y-auto`}>
                  <pre className="flex flex-col gap-1">
                    {logs.map((log, i) => (
                      <code
                        ref={
                          logs.length - 1 === i ? logContainerRef : undefined
                        }
                        key={i}
                        className="font-sans"
                      >{`> ${log}`}</code>
                    ))}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deploy;
