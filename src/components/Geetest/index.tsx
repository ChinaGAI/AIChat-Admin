import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

declare global {
  interface Window {
    initGeetest4: any;
  }
}

export interface GeetestRef {
  reset: () => void;
}

const Geetest = forwardRef<GeetestRef>(({ onChange }: any, ref) => {
  const geetestContainer = useRef(null);
  const [captchaRef, setCaptchaRef] = useState<any>();

  useImperativeHandle(
    ref,
    () => {
      return {
        reset: () => captchaRef?.reset(),
      };
    },
    [captchaRef],
  );

  useEffect(() => {
    // 动态加载极验的SDK
    const script = document.createElement('script');
    script.src = 'https://static.geetest.com/v4/gt4.js'; // 极验的SDK URL
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 初始化极验
      window.initGeetest4(
        {
          captchaId: 'c95ceaa573e9ea4d7132259b51264bac',
          product: 'float',
          riskType: 'ai',
          language: 'zho',
          nativeButton: {
            width: '100%',
            height: '40px',
          },
        },
        (captchaObj: any) => {
          setCaptchaRef(captchaObj);
          captchaObj.appendTo(geetestContainer.current); // 显示验证码
          captchaObj.onSuccess(function () {
            onChange(captchaObj.getValidate());
          });
        },
      );
    };
  }, []);

  return <div ref={geetestContainer} style={{ height: '40px' }}></div>;
});

export default Geetest;
