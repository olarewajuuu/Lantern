const ChatButton = () => {
    return (
      <div className="fixed bottom-4 right-4 bg-[#152F56] p-4 rounded-full shadow-lg cursor-pointer z-50">
        <a
          href="https://wa.me/2348154336976"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="36"
            height="36"
            className="text-white"
          >
            <path d="M20.52 3.48a11.86 11.86 0 1 0-2.12 18.36L23 23l-1.16-4.6a11.85 11.85 0 0 0-1.32-14.92ZM12 21a8.94 8.94 0 0 1-4.88-1.46L6 19l.47-1.79A8.94 8.94 0 1 1 12 21Zm5.44-5.16c-.3-.15-1.76-.87-2.03-.97s-.47-.15-.67.15-.77.97-.95 1.17-.35.22-.65.07a7.22 7.22 0 0 1-2.13-1.31 8 8 0 0 1-1.46-1.8c-.15-.27 0-.42.12-.57.12-.12.3-.35.45-.52s.15-.3.23-.5a.55.55 0 0 0-.03-.52c-.07-.15-.67-1.57-.91-2.13s-.48-.47-.67-.48h-.56a1.08 1.08 0 0 0-.8.37 3.38 3.38 0 0 0-1.06 2.5 5.91 5.91 0 0 0 1.23 2.95 13.39 13.39 0 0 0 5.48 4.57 12.78 12.78 0 0 0 1.27.47 3.13 3.13 0 0 0 1.47.1 2.64 2.64 0 0 0 1.77-1.23 2.16 2.16 0 0 0 .15-1.23c-.07-.13-.27-.2-.57-.35Z" />
          </svg>
        </a>
      </div>
    );
  };
  
  export default ChatButton;
  