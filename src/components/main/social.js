function Social({date}) {
    return ( 
        <div className="social__link" date={date}>
        <a
          className="footer__social-link"
          href="https://max.ru/u/f9LHodD0cOIFp2Jgvbkew1sPftweGr_Cb_is_o8tUXgucjqHCq3hb_EdZRE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Профиль в MAX"
          title="MAX"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 1000 1000"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="b-f">
                <stop offset="0" stopColor="#00f" />
                <stop offset="1" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="a-f">
                <stop offset="0" stopColor="#4cf" />
                <stop offset=".662" stopColor="#53e" />
                <stop offset="1" stopColor="#93d" />
              </linearGradient>

              <linearGradient
                id="c-f"
                x1="117.847"
                x2="1000"
                y1="760.536"
                y2="500"
                gradientUnits="userSpaceOnUse"
                href="#a-f"
              />

              <radialGradient
                id="d-f"
                cx="-87.392"
                cy="1166.116"
                r="500"
                fx="-87.392"
                fy="1166.116"
                gradientTransform="rotate(51.356 1551.478 559.3) scale(2.42703433 1)"
                gradientUnits="userSpaceOnUse"
                href="#b-f"
              />
            </defs>

            <rect width="1000" height="1000" fill="url(#c-f)" ry="249.681" />
            <rect width="1000" height="1000" fill="url(#d-f)" ry="249.681" />

            <path
              fill="#fff"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z"
            />
          </svg>
        </a>

        <a
          className="footer__social-link"
          href="https://vk.com/idprex"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Профиль ВКонтакте"
          title="ВКонтакте"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="11.2" ry="11.2" fill="#4489c8" />
            <path
              fill="#fff"
              d="M9.62,19.77H17.3a.79.79,0,0,1,.74.51c.85,2.19,4.38,10.76,7.61,11.46,2.4,0,1.55-11.4-1.5-11.4-.8,0,1.42-1.42,1.57-1.48a16.38,16.38,0,0,1,8.66,0c1.53.64,1.79,2.43,1.83,3.95s-1.7,8,.59,8.7c3,.92,6.86-8.49,7.76-10.8a.79.79,0,0,1,.74-.5h8.55a.8.8,0,0,1,.74,1.11,74.74,74.74,0,0,1-6.31,11.52,1.59,1.59,0,0,0,.16,2C51,37.58,58,45.34,54,45.34H45.37a1.57,1.57,0,0,1-1.18-.53c-1.34-1.48-5.24-5.6-7-5.27-1.46.27-1.6,2.75-1.53,4.37a1.6,1.6,0,0,1-1.48,1.68c-1.53.09-3.62.13-3.81.12-6.1-.39-9.71-4.46-13.16-9A56.33,56.33,0,0,1,8.86,20.83.81.81,0,0,1,9.62,19.77Z"
            />
          </svg>
        </a>

        <a
          className="footer__social-link"
          href="https://t.me/fagot199"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Профиль в Telegram"
          title="Telegram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="12" fill="#229ED9" />
            <path
              fill="#fff"
              d="M5.5 11.9l11.7-4.5c.5-.2 1 .1.9.8l-2 9.4c-.1.6-.5.8-1 .5l-3-2.2-1.4 1.4c-.2.2-.3.3-.6.3l.2-3 5.6-5c.2-.2-.1-.3-.4-.2l-7 4.4-2.9-.9c-.6-.2-.6-.6-.1-.8z"
            />
          </svg>
        </a>
      </div>
     );
}

export default Social;