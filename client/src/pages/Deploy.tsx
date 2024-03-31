import { io } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import axios from '@/config/axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { CopyIcon } from '@radix-ui/react-icons';

const socket = io(import.meta.env.VITE_SOCKET_URL);

const Deploy = () => {
  const location = useLocation();
  const { repoId } = useParams();
  const url = location.state.cloneUrl;

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

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
          <div className="flex flex-col lg:flex-row p-4 lg:px-12 lg:py-8 gap-4 lg:gap-8">
            <div className="w-full md:h-[300px] lg:w-1/2 rounded-md flex flex-col flex-grow gap-4">
              <div className="h-40 md:h-full border"></div>
              <Button className="w-full" onClick={handleClickDeploy}>
                {loading ? `Deploying (${repoId})` : 'Deploy'}
              </Button>
            </div>
            <div className="w-full lg:w-1/2">
              {logs.length > 0 ? (
                <div className={`rounded-lg h-[300px] overflow-y-auto`}>
                  <span className="font-medium text-lg">Logs</span>
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
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <span className="text-secondary-foreground/40">
                    No logs yet
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading === false && previewUrl.length > 0 && (
        <div className="flex flex-col w-full md:w-4/5 lg:w-2/3 gap-4 items-center mx-auto">
          <span className="text-left text-2xl font-medium">
            You can now visit your Project
          </span>
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-2">
            <Input value={previewUrl} readOnly />
            <Button
              className="hidden md:block"
              variant={'outline'}
              size={'icon'}
              onClick={() => {
                navigator.clipboard.writeText(previewUrl);
              }}
            >
              <CopyIcon />
            </Button>
            <Button onClick={() => window.open(previewUrl, '_blank')}>
              Open
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deploy;
