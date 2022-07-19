gsap.config({ trialWarn: false });
gsap.registerPlugin(MorphSVGPlugin);

class CatAnimated extends HTMLElement {
  static pawsDuration = 0.6;
  static eyesDuration = 0.3;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    const template = document.createElement('template');

    style.innerHTML = `
      :host {
        display: block;
      }

      svg {
        display: block;
        fill: none;
      }
    `;

    template.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <clipPath id="cat-animated-clip-eye-right">
          <path style="transform: scale(calc((41.88 + 3) / 41.88), calc((50.44 + 3) / 50.44)); transform-origin: calc(220.09px + 41.88px / 2) calc(158.27px + 50.44px / 2);" class="cat-animated-eye-clip" d="M241.03 208.71C252.595 208.71 261.97 197.419 261.97 183.49C261.97 169.561 252.595 158.27 241.03 158.27C229.465 158.27 220.09 169.561 220.09 183.49C220.09 197.419 229.465 208.71 241.03 208.71Z"/>
        </clipPath>
        <clipPath id="cat-animated-clip-eye-left">
          <path style="transform: scale(calc((40.96 + 3) / 40.96), calc((52.58 + 3) / 52.58)); transform-origin: calc(294.08px + 40.96px / 2) calc(160.11px + 52.58px / 2);" class="cat-animated-eye-clip" d="M314.56 212.69C325.871 212.69 335.04 200.92 335.04 186.4C335.04 171.88 325.871 160.11 314.56 160.11C303.249 160.11 294.08 171.88 294.08 186.4C294.08 200.92 303.249 212.69 314.56 212.69Z"/>
        </clipPath>

        <path class="cat-animated-blanket" d="M24.1299 481.73C34.0499 480.397 43.9865 479.257 53.9399 478.31C63.9399 477.31 73.8499 476.39 83.8299 475.63C103.79 474.13 123.79 473.213 143.83 472.88H151.35C153.85 472.88 156.35 472.88 158.86 472.88C163.867 472.953 168.867 473.067 173.86 473.22C183.86 473.53 193.86 473.8 203.86 474.29C208.86 474.54 213.86 474.83 218.86 475.36C221.38 475.61 223.86 475.96 226.42 476.46C227.702 476.719 228.967 477.053 230.21 477.46C231.51 477.89 232.64 478.39 233.8 478.88C238.25 480.926 242.911 482.478 247.7 483.51C252.36 484.505 257.205 484.193 261.7 482.61C263.88 481.78 266.07 480.55 268.47 479.54C270.873 478.505 273.391 477.76 275.97 477.32C278.533 476.889 281.132 476.712 283.73 476.79C286.287 476.895 288.835 477.158 291.36 477.58C293.88 477.944 296.38 478.434 298.85 479.05C301.33 479.65 303.77 480.49 306.11 481.26C307.25 481.643 308.412 481.957 309.59 482.2L311.34 482.52L313.11 482.69C315.494 482.841 317.888 482.707 320.24 482.29C325.023 481.33 329.641 479.679 333.95 477.39C335.07 476.85 336.17 476.27 337.35 475.73L339.15 474.96L340.99 474.32C343.435 473.553 345.931 472.958 348.46 472.54C358.46 470.86 368.46 470.54 378.46 470.19C388.46 469.84 398.46 469.71 408.46 469.53C418.46 469.35 428.46 469.41 438.46 469.7C448.46 469.99 458.46 470.58 468.46 471.37C478.46 472.16 488.39 473.15 498.31 474.37C478.4 472.52 458.43 471.31 438.45 471.14C428.45 471 418.467 471.083 408.5 471.39C398.5 471.71 388.5 472.01 378.5 472.45C373.5 472.68 368.5 472.94 363.57 473.34C358.64 473.74 353.66 474.19 348.81 475.05C346.406 475.461 344.033 476.039 341.71 476.78L340.01 477.38L338.37 478.09C337.27 478.59 336.16 479.18 335.04 479.74C330.51 482.16 325.652 483.912 320.62 484.94C318.048 485.407 315.429 485.565 312.82 485.41C310.212 485.228 307.638 484.714 305.16 483.88C302.74 483.1 300.44 482.33 298.06 481.75C295.68 481.17 293.29 480.75 290.83 480.37C288.421 479.979 285.989 479.738 283.55 479.65C281.145 479.587 278.74 479.762 276.37 480.17C274.02 480.585 271.727 481.276 269.54 482.23C267.33 483.17 265.15 484.42 262.66 485.37C257.657 487.128 252.266 487.474 247.08 486.37C242.089 485.279 237.233 483.642 232.6 481.49C231.45 481.01 230.3 480.49 229.22 480.14C228.086 479.766 226.931 479.462 225.76 479.23C223.38 478.75 220.94 478.4 218.48 478.14C213.56 477.6 208.59 477.28 203.61 477.01C193.61 476.48 183.61 476.16 173.66 475.81C163.71 475.46 153.66 475.23 143.72 475.18C123.72 475.18 103.72 475.89 83.8199 477.09C63.9199 478.29 43.9999 479.81 24.1299 481.73Z" fill="#1C1C1C"/>

        <path d="M337.84 235.9C330.74 241.18 320.84 248.27 311.84 247.4C292.91 245.56 293.69 202.34 275.04 198.4C253.89 193.88 233.04 241 205.79 235.16C201.158 234.072 196.898 231.77 193.45 228.49C193.254 232.465 193.499 236.449 194.18 240.37C198.36 264.24 217.39 275.37 235.48 296.14C246.181 308.736 255.104 322.74 262 337.76C262 337.76 276 368.62 277.85 443.94C278.012 450.566 277.638 457.194 276.73 463.76C276.33 466.48 275.92 468.67 275.66 469.94C279.948 469.982 284.233 469.748 288.49 469.24C290.644 468.98 292.694 468.67 294.64 468.31C294.36 464.31 293.94 457.75 293.56 449.69C291.45 404.69 290.29 375.58 298.98 343.76C301.39 334.96 304.67 323.23 312.22 309.2C329.79 276.52 353.41 263.12 359.38 231.75C359.7 230.05 361.73 219.05 358.61 217.69C355.49 216.33 350.2 226.71 337.84 235.9Z" fill="#EAE8D8"/>
        <path d="M355.69 193.9C354.05 184.99 353.24 180.54 352.91 178.03C351.7 168.91 350.31 157.81 352.68 144.54C353.553 139.653 354.862 134.854 356.59 130.2C359.045 121.766 359.829 112.934 358.9 104.2C358.09 96.69 357.34 89.8 352.9 87.63C346.55 84.54 336.64 92.85 331.34 97.29C326.648 101.234 322.57 105.854 319.24 111C317.11 114 313.84 117.42 309.53 117.75C306.67 117.97 304.8 116.75 300.25 114.88C296.079 113.223 291.773 111.925 287.38 111C275.24 108.26 264.03 112.94 260.43 114.44C254.568 116.891 249.208 120.403 244.62 124.8C239.425 116.115 232.724 108.424 224.83 102.09C218.27 96.86 211.62 91.57 206.43 93.68C200.82 95.96 200.02 105.78 199.43 112.49C199.43 112.49 198.37 125.49 206.43 154.97C203.194 162.204 200.519 169.676 198.43 177.32C196.426 184.957 194.946 192.722 194 200.56C193.346 206.169 193.029 211.813 193.05 217.46C193.05 223.37 193.36 227.87 193.41 228.46C194.62 242.39 238.62 275.57 286.49 268.51C331.29 261.91 355.61 223.58 359.97 216.43C358.94 211.15 357.43 203.38 355.69 193.9Z" fill="#2B2B2B"/>
        <path d="M278.48 445C279.26 417.5 274.17 403.31 270 367.92C269.72 365.57 269 359.65 267.47 351.8C265.94 343.95 264.23 338.22 263.25 334.71C256.25 309.9 258.79 308.02 254.96 299.66C249 286.78 241 284.94 225 272.39C215.67 265.03 203.69 251.53 192.93 232.39C194.094 238.73 194.935 245.125 195.45 251.55C196.192 260.007 196.192 268.513 195.45 276.97C193.45 295.25 182.24 298.26 160.51 332.56C152.87 344.61 148.8 352.86 141.08 368.47C132.64 385.55 131.19 390.74 130.56 396.02C128.49 413.27 135.66 427.18 138.2 431.97C150.81 455.67 175.28 466.97 191.4 469.25C195.77 469.86 198.63 470.16 209.57 470.25C225.42 470.43 248.05 470.5 276.25 469.97C277.491 461.699 278.235 453.36 278.48 445Z" fill="#2B2B2B"/>
        <path d="M363.21 241.29C362.4 234.13 361.21 227 361.21 227C360.5 222.79 359.79 219.17 359.21 216.26C356.023 225.174 352.351 233.907 348.21 242.42C338.86 261.58 332.73 274.14 320.37 285.91C317.06 289.07 315.55 290.02 313.45 291.85C294.6 308.27 291.74 340 292.19 396.44C292.35 416.69 292.94 441.08 294.46 468.78C302.69 466.7 307.54 467.13 310.52 468.02C312.566 468.656 314.688 469.016 316.83 469.09C318.828 469.222 320.834 468.991 322.75 468.41C324.627 467.803 326.369 466.839 327.88 465.57C329.77 463.97 330.88 462.2 332.51 458.79C335.529 452.367 337.927 445.67 339.67 438.79C340.02 437.5 340.28 436.43 340.33 436.23C340.62 435.04 340.97 433.38 341.67 429.71C346.09 406.48 348.51 388.87 348.51 388.87C350.37 375.28 353.51 355.41 359.12 328.7C359.12 328.71 366.92 274.28 363.21 241.29Z" fill="#2B2B2B"/>
        <path d="M229.29 129C227.67 134.54 221.69 140.22 215.85 139.43C208.74 138.43 205.91 128.53 205.15 125.83C202.67 117.11 204.1 104.83 209.33 103.17C216.36 100.89 232.87 116.76 229.29 129Z" fill="#E9BAAA"/>
        <path d="M350 115.53C349.72 124.95 349.44 134.39 344.13 136.66C338.82 138.93 329.44 133.29 326.92 126.09C322.27 112.81 341.13 95.55 347.07 97.92C350.49 99.28 350.25 107.4 350 115.53Z" fill="#E9BAAA"/>
        <path d="M285.44 212.22C285.53 215.42 283.77 219.51 281.02 219.89C278.02 220.3 274.75 216.14 274.54 212.22C274.35 208.62 276.7 204.36 279.54 204.22C282.38 204.08 285.33 208.45 285.44 212.22Z" fill="black"/>

        <g clip-path="url(#cat-animated-clip-eye-right)">
          <path class="cat-animated-eye" d="M241.03 208.71C252.595 208.71 261.97 197.419 261.97 183.49C261.97 169.561 252.595 158.27 241.03 158.27C229.465 158.27 220.09 169.561 220.09 183.49C220.09 197.419 229.465 208.71 241.03 208.71Z" fill="#95E8A5" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
          <path d="M242.18 194.73C246.068 194.73 249.22 189.801 249.22 183.72C249.22 177.639 246.068 172.71 242.18 172.71C238.292 172.71 235.14 177.639 235.14 183.72C235.14 189.801 238.292 194.73 242.18 194.73Z" fill="#0C0C0C"/>
          <path d="M248.71 182C251.074 182 252.99 179.614 252.99 176.67C252.99 173.726 251.074 171.34 248.71 171.34C246.346 171.34 244.43 173.726 244.43 176.67C244.43 179.614 246.346 182 248.71 182Z" fill="white"/>
        </g>

        <g clip-path="url(#cat-animated-clip-eye-left)">
          <path class="cat-animated-eye" d="M314.56 212.69C325.871 212.69 335.04 200.92 335.04 186.4C335.04 171.88 325.871 160.11 314.56 160.11C303.249 160.11 294.08 171.88 294.08 186.4C294.08 200.92 303.249 212.69 314.56 212.69Z" fill="#95E8A5" stroke="black" stroke-width="3" stroke-miterlimit="10"/>
          <path d="M310.64 194.73C314.533 194.73 317.69 189.801 317.69 183.72C317.69 177.639 314.533 172.71 310.64 172.71C306.746 172.71 303.59 177.639 303.59 183.72C303.59 189.801 306.746 194.73 310.64 194.73Z" fill="#0C0C0C"/>
          <path d="M317.34 183.71C319.24 183.71 320.78 181.248 320.78 178.21C320.78 175.172 319.24 172.71 317.34 172.71C315.44 172.71 313.9 175.172 313.9 178.21C313.9 181.248 315.44 183.71 317.34 183.71Z" fill="white"/>
        </g>

        <path d="M331.16 462.88C332.6 458.62 333.74 454.97 334.58 452.17C340.52 432.47 344.96 414.04 353.35 363.79C353.35 363.79 363.2 304.79 363.98 282.32C364.09 279.07 364.42 262.11 364.42 256.43C364.32 253.02 364.15 249.43 363.86 245.52C362.1 221.52 355.27 202.52 352.08 171.97C351.092 164.077 351.092 156.093 352.08 148.2C353.08 140.71 354 140.97 356.08 130.2C359.18 114.29 358.85 104.89 356.91 96.81C355.12 89.38 353.18 88.1 352.35 87.67C346 84.33 334.95 93.77 330.79 97.33C318.79 107.58 320.48 113.01 313.17 116.33C303.12 120.91 295.73 112.63 280.82 111.8C272.16 111.32 259.73 113.29 244.11 124.8C229.82 104.2 214 90.29 205.92 93.71C197.11 97.45 196.13 122.49 205.92 155C201.956 164.298 198.801 173.92 196.49 183.76C184.95 233.06 203.49 251.64 192.72 286.54C185.11 311.15 175.23 304.01 152.9 345.71C136.48 376.39 126.77 394.53 131.9 416.19C139.16 446.87 171.71 466.27 189.9 469C200.393 470.275 210.98 470.59 221.53 469.94C226.1 469.68 229.85 469.29 232.33 469L275.71 469.94C282.07 469.55 288.8 470.94 294.8 468.76C307.48 464.2 316.18 472.57 324.66 468.11C327.133 466.785 329.337 465.012 331.16 462.88V462.88Z" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M271.29 229.07C270.543 230.198 269.707 231.265 268.79 232.26C267.86 233.247 266.857 234.163 265.79 235C263.633 236.677 261.223 238 258.65 238.92C256.076 239.833 253.379 240.352 250.65 240.46C249.292 240.508 247.933 240.472 246.58 240.35C245.232 240.205 243.896 239.968 242.58 239.64C245.238 239.921 247.918 239.941 250.58 239.7C253.212 239.443 255.804 238.872 258.3 238C259.543 237.557 260.756 237.033 261.93 236.43C263.107 235.84 264.243 235.172 265.33 234.43C267.521 232.885 269.522 231.085 271.29 229.07V229.07Z" fill="white"/>
        <path d="M290.82 229.4C292.536 231.213 294.421 232.857 296.45 234.31C298.468 235.739 300.634 236.946 302.91 237.91C305.191 238.876 307.568 239.596 310 240.06C312.454 240.516 314.944 240.747 317.44 240.75C316.193 240.944 314.933 241.047 313.67 241.06C312.403 241.055 311.138 240.975 309.88 240.82C307.349 240.486 304.873 239.813 302.52 238.82C300.173 237.822 297.975 236.503 295.99 234.9C295.003 234.101 294.068 233.239 293.19 232.32C292.33 231.406 291.538 230.43 290.82 229.4V229.4Z" fill="white"/>
        <path d="M292.16 225.94C293.954 227.05 295.821 228.036 297.75 228.89C299.666 229.731 301.646 230.42 303.67 230.95C305.693 231.472 307.752 231.84 309.83 232.05C311.935 232.235 314.049 232.285 316.16 232.2C315.118 232.435 314.063 232.605 313 232.71C311.933 232.798 310.861 232.832 309.79 232.81C305.47 232.703 301.232 231.598 297.41 229.58C296.465 229.078 295.548 228.527 294.66 227.93C293.786 227.32 292.951 226.655 292.16 225.94V225.94Z" fill="#FFFFFD"/>
        <path d="M292.81 222.55C294.29 223.05 295.81 223.55 297.27 223.9C298.73 224.25 300.27 224.59 301.8 224.82C303.33 225.05 304.86 225.19 306.41 225.27C307.96 225.35 309.5 225.33 311.07 225.27C309.535 225.606 307.971 225.794 306.4 225.83C303.245 225.914 300.1 225.44 297.11 224.43C295.619 223.946 294.178 223.316 292.81 222.55V222.55Z" fill="white"/>
        <path d="M268.16 226.33C265.347 228.583 262.271 230.486 259 232C257.354 232.838 255.567 233.367 253.73 233.56C251.903 233.678 250.072 233.388 248.37 232.71C250.116 233.001 251.896 233.028 253.65 232.79C255.366 232.459 257.025 231.887 258.58 231.09C261.79 229.62 264.94 228 268.16 226.33Z" fill="white"/>
        <path d="M280.35 215.89C281.579 220.732 281.314 225.832 279.59 230.52C278.25 234.09 276.69 239.67 272.4 240.65C269.89 241.23 267.53 240 266.26 239.18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M279.59 230.52C277.77 234.74 279.51 239.09 282.5 240.35C285.49 241.61 288.74 239.35 288.91 239.18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M267.89 221.64C266.809 222.588 265.648 223.441 264.42 224.19C263.197 224.937 261.928 225.605 260.62 226.19C259.31 226.848 257.902 227.287 256.45 227.49C254.976 227.522 253.52 227.152 252.24 226.42C253.574 226.872 254.988 227.039 256.39 226.91C257.749 226.604 259.065 226.134 260.31 225.51C261.6 224.93 262.87 224.29 264.14 223.65C265.41 223.01 266.64 222.34 267.89 221.64Z" fill="white"/>
        <path d="M137.41 430.4L137.27 419.68" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        <path class="cat-animated-paw-right" d="M278.17 458.85C276.96 470.54 269.84 480.2 260.73 482.71C247.97 486.23 231.03 475.78 228.14 457.06C235.08 450.818 244.173 447.516 253.501 447.85C262.83 448.184 271.664 452.128 278.14 458.85H278.17Z" fill="#EAE8D8"/>
        <path class="cat-animated-paw-right" d="M277.6 423.9C277.09 414.68 275.6 403.56 272.6 381.32C272.2 378.38 271.6 374.43 270.74 369.32C270.12 365.75 269.22 361.25 267.55 354.26C267.47 353.94 267.4 353.62 267.32 353.26H267.18C264.206 353.719 261.319 354.629 258.62 355.96C256.058 357.098 253.438 358.1 250.77 358.96C241.23 361.96 231.01 363.41 222.65 369.28C219.25 371.67 215.85 374.93 214.5 378.96C213.476 381.932 213.134 385.097 213.5 388.22C213.542 388.271 213.576 388.328 213.6 388.39C214.384 391.131 214.906 393.94 215.16 396.78C215.537 399.651 216.092 402.497 216.82 405.3C218.15 410.62 219.3 416.05 220.22 421.46C221.1 426.62 221.67 431.83 222.58 436.99C223.023 439.574 223.597 442.134 224.3 444.66C224.9 446.8 225.71 448.88 226.3 451.01C227.22 454.18 228 457.79 229.97 460.54C233.092 457.486 236.796 455.089 240.861 453.493C244.927 451.896 249.272 451.132 253.638 451.246C258.004 451.36 262.303 452.349 266.28 454.155C270.257 455.961 273.831 458.547 276.79 461.76C277.997 449.178 278.268 436.523 277.6 423.9V423.9Z" fill="#2B2B2B"/>
        <path class="cat-animated-paw-right" d="M214.35 395.06C215.229 404.791 216.722 414.457 218.82 424C219.45 426.87 223.82 451.39 232.6 468.81C234.397 472.588 237.047 475.898 240.34 478.48C243.86 481.253 248.086 482.985 252.54 483.48C253.41 483.57 264.17 484.48 271.43 476.81C275.08 472.96 276.11 468.81 277.33 463.52C278.87 456.91 278.79 452.18 278.09 437.7C277.09 416.59 277.67 422.7 276.38 409.78C274.482 391.168 271.548 372.675 267.59 354.39" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="cat-animated-paw-right" d="M266.25 479.94L261.81 463.94" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="cat-animated-paw-right" d="M251.68 482.5L252.52 468.42" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        <path class="cat-animated-paw-left" d="M294.18 454.81C294.268 458.947 294.828 463.06 295.85 467.07C297.37 473.02 298.34 476.83 301.8 479.53C305.46 482.39 309.8 482.36 312.23 482.35C317.902 482.216 323.316 479.949 327.39 476C329.867 473.404 331.72 470.278 332.81 466.86C334.129 463.286 334.774 459.499 334.71 455.69C328.633 451.98 321.681 449.945 314.562 449.792C307.444 449.64 300.411 451.374 294.18 454.82V454.81Z" fill="#EAE8D8"/>
        <path class="cat-animated-paw-left" d="M346.24 407.06C342.36 425.25 338.12 442.64 333.64 459.21C328.608 454.887 322.268 452.382 315.64 452.1C307.879 451.935 300.355 454.776 294.64 460.03C289.955 422.846 290.389 385.196 295.93 348.13C302.382 337.182 312.139 328.562 323.798 323.507C335.458 318.453 348.419 317.225 360.82 320C357.48 347.27 352.78 376.4 346.24 407.06Z" fill="#2B2B2B"/>
        <path class="cat-animated-paw-left" d="M360.37 317.25C358.075 342.282 354.471 367.176 349.57 391.83C347.69 401.02 347.29 401.73 344.37 415.95C344.22 416.67 340.37 435.6 334.37 458.32C331.37 469.76 328.99 477.68 322.37 480.68C318.47 482.45 313.37 482.37 312.77 482.36C310.42 482.31 304.92 482.18 300.93 478.88C297.62 476.13 296.72 472.33 295.53 465.22C293.43 452.66 292.53 442.89 292.43 440.6C291.89 430.6 291.27 423.66 291.27 413.77C291.27 404.45 291.69 397.89 291.98 392.77C292.58 382.24 293.23 367.01 293.36 347.29" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="cat-animated-paw-left" d="M307.13 480.68C308.22 473.1 308.88 468.48 309.13 466.77" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="cat-animated-paw-left" d="M320.15 467.58L321.71 481.36" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

        <path d="M198.22 120.14C200.82 130.873 203.424 141.61 206.03 152.35C219.089 155.668 232.638 156.609 246.03 155.13C286.31 150.57 311.97 124.95 320.13 116.06L311.46 85.1801L198.22 120.14Z" fill="#213A58" stroke="#1C1C1C" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M152 119.42L235.82 47.59L354.46 49.59L268 121.21L152 119.42Z" fill="#4F8BFA" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M220.53 87C219.07 87.42 216.95 88 214.4 88.89C204.15 92.27 197.07 95.75 188.4 100.04C171.67 108.34 160.66 113.94 150.21 122.45C147.614 124.414 145.501 126.945 144.03 129.85C140.76 136.59 142.33 143.67 144.03 149.85C147.643 162.702 152.493 175.173 158.51 187.09L165.15 183.45C162.335 178.123 159.945 172.583 158 166.88C153.77 154.39 149.29 141.15 154.69 130.67C157.87 124.51 163.31 121.55 168.1 119.02C180.1 112.69 198.71 103.44 224.1 92.93C223 91 221.74 89 220.53 87Z" fill="#213A58" stroke="#1C1C1C" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M165.13 181.35C164.483 181.054 163.784 180.888 163.072 180.862C162.361 180.837 161.651 180.951 160.984 181.199C160.317 181.448 159.705 181.825 159.184 182.31C158.662 182.795 158.241 183.378 157.945 184.025C157.649 184.672 157.484 185.372 157.458 186.083C157.432 186.795 157.546 187.504 157.795 188.172C158.043 188.839 158.421 189.45 158.905 189.972C159.39 190.493 159.973 190.914 160.62 191.21C163.83 192.8 168.23 190.45 168.73 187.11C168.839 185.889 168.547 184.666 167.897 183.626C167.247 182.586 166.276 181.787 165.13 181.35V181.35Z" fill="#213A58" stroke="#1C1C1C" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M203.92 143.63C213.856 146.144 224.124 147.082 234.35 146.41C252.48 145.18 265.45 139.09 276.76 133.65C291.673 126.457 305.39 117.014 317.43 105.65" stroke="#1C1C1C" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M159.5 190.44C159.68 196.02 159.867 201.6 160.06 207.18" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M162.62 191.71C163.36 198.59 164.103 205.467 164.85 212.34" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M165 191.32L169.28 210.32" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M166.71 190.35L173.78 215.35" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M166.71 190.35L176.38 207.41" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M168.73 187.11L176 200.2" stroke="#1C1C1C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M218.62 88.9401C218.647 90.4127 219.148 91.8375 220.049 93.0029C220.95 94.1684 222.202 95.0125 223.62 95.4101C225.313 95.9108 227.133 95.7531 228.715 94.9687C230.297 94.1842 231.524 92.831 232.15 91.1801C232.68 89.673 232.671 88.0288 232.124 86.5279C231.576 85.0271 230.526 83.7625 229.15 82.9501C225.07 80.8001 218.82 84.4301 218.62 88.9401Z" fill="#213A58" stroke="#1C1C1C" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
    `;

    shadow.append(style);
    shadow.append(template.content);

    const catPawRightPaths = shadow.querySelectorAll('.cat-animated-paw-right');
    const catPawLeftPaths = shadow.querySelectorAll('.cat-animated-paw-left');
    const catBlanketPaths = shadow.querySelectorAll('.cat-animated-blanket');
    const catEyesPaths = shadow.querySelectorAll('.cat-animated-eye');
    const catEyesClipPaths = shadow.querySelectorAll('.cat-animated-eye-clip');

    const catPawRightFrames = [
      [
        'M278.17 448.85C276.96 460.54 269.84 470.2 260.73 472.71C247.97 476.23 231.03 465.78 228.14 447.06C235.08 440.818 244.173 437.516 253.501 437.85C262.83 438.184 271.664 442.128 278.14 448.85H278.17Z',
        'M277.6 413.9C277.09 404.68 275.6 393.56 272.6 371.32C272.2 368.38 271.6 364.43 270.74 359.32C270.12 355.75 269.22 351.25 267.55 344.26C267.47 343.94 267.4 343.62 267.32 343.26H267.18C264.206 343.719 261.319 344.629 258.62 345.96C256.058 347.098 253.438 348.1 250.77 348.96C241.23 351.96 231.01 353.41 222.65 359.28C219.25 361.67 215.85 364.93 214.5 368.96C213.476 371.932 213.134 375.097 213.5 378.22C213.542 378.271 213.576 378.328 213.6 378.39C214.384 381.131 214.906 383.94 215.16 386.78C215.537 389.651 216.092 392.497 216.82 395.3C218.15 400.62 219.3 406.05 220.22 411.46C221.1 416.62 221.67 421.83 222.58 426.99C223.023 429.574 223.597 432.134 224.3 434.66C224.9 436.8 225.71 438.88 226.3 441.01C227.22 444.18 228 447.79 229.97 450.54C233.092 447.486 236.796 445.089 240.861 443.493C244.927 441.896 249.272 441.132 253.638 441.246C258.004 441.36 262.303 442.349 266.28 444.155C270.257 445.961 273.831 448.547 276.79 451.76C277.997 439.178 278.268 426.523 277.6 413.9V413.9Z',
        'M214.35 385.06C215.229 394.791 216.722 404.457 218.82 414C219.45 416.87 223.82 441.39 232.6 458.81C234.397 462.588 237.047 465.898 240.34 468.48C243.86 471.253 248.086 472.985 252.54 473.48C253.41 473.57 264.17 474.48 271.43 466.81C275.08 462.96 276.11 458.81 277.33 453.52C278.87 446.91 278.79 442.18 278.09 427.7C277.46 414.88 277.44 412.1 277.24 409C277.24 409 276.97 404.86 276.38 399.78C275.63 393.23 271.85 372.25 265.71 344.01',
        'M266.25 469.94L261.81 453.94',
        'M251.68 472.5L252.52 458.42',
      ],
      Array.from(catPawRightPaths).map((path) => path.getAttribute('d')),
    ];

    const catPawLeftFrames = [
      [
        'M294.18 446.81C294.267 450.947 294.827 455.06 295.85 459.07C297.37 465.02 298.34 468.83 301.8 471.53C305.46 474.39 309.8 474.36 312.23 474.35C317.902 474.216 323.315 471.949 327.39 468C329.866 465.404 331.719 462.278 332.81 458.86C334.129 455.286 334.773 451.499 334.71 447.69C328.632 443.98 321.681 441.945 314.562 441.792C307.443 441.64 300.411 443.374 294.18 446.82V446.81Z',
        'M346.24 399.06C342.36 417.25 338.12 434.64 333.64 451.21C328.608 446.887 322.268 444.382 315.64 444.1C307.879 443.935 300.355 446.776 294.64 452.03C289.955 414.846 290.389 377.196 295.93 340.13C302.382 329.182 312.139 320.562 323.798 315.507C335.458 310.453 348.419 309.225 360.82 312C357.48 339.27 352.78 368.4 346.24 399.06Z',
        'M361.29 308.76C357.22 343.67 352.71 368.46 349.57 383.83C347.57 393.59 347.29 393.71 344.37 407.95C344.22 408.67 340.37 427.6 334.37 450.32C331.37 461.76 328.99 469.68 322.37 472.68C318.47 474.45 313.37 474.37 312.77 474.36C310.42 474.31 304.92 474.18 300.93 470.88C297.62 468.13 296.72 464.33 295.53 457.22C293.43 444.66 292.53 434.89 292.43 432.6C291.89 422.6 291.27 415.66 291.27 405.77C291.27 404.22 291.27 401.35 291.36 398.47C291.36 398.47 291.47 391.64 291.71 384.47C291.95 377.3 292.79 359.82 294.43 336.75',
        'M307.13 472.68C308.22 465.1 308.88 460.48 309.13 458.77',
        'M320.149 459.58L321.709 473.36',
      ],
      Array.from(catPawLeftPaths).map((path) => path.getAttribute('d')),
    ];

    const catBlanketFrames = [
      [
        'M24.1299 481.73C34.0032 480.397 43.8932 479.26 53.7999 478.32C63.7099 477.32 73.6199 476.42 83.5499 475.66C103.41 474.147 123.31 473.223 143.25 472.89C148.25 472.89 153.25 472.8 158.25 472.89C163.25 472.98 168.25 473.06 173.2 473.24C183.2 473.59 193.11 474.08 203.06 474.8C213.01 475.52 223 476.51 232.78 478C242.56 479.49 252.32 478.37 262.24 477.48C264.88 477.26 267.44 477.48 269.85 477.48C272.267 477.523 274.683 477.386 277.08 477.07C279.634 476.725 282.216 476.625 284.79 476.77C289.853 477.139 294.873 477.959 299.79 479.22C302.25 479.87 304.66 480.74 306.96 481.45C311.52 482.872 316.371 483.089 321.04 482.08C325.782 481 330.357 479.285 334.64 476.98C335.75 476.43 336.85 475.86 338.07 475.33C339.263 474.828 340.481 474.387 341.72 474.01C344.163 473.298 346.647 472.74 349.16 472.34C359.16 470.74 369.16 470.44 379.08 470.1C389 469.76 398.99 469.63 408.94 469.46C418.89 469.29 428.87 469.34 438.83 469.64C448.79 469.94 458.74 470.53 468.67 471.31C478.6 472.09 488.51 473.09 498.38 474.31C478.56 472.47 458.69 471.26 438.8 471.08C418.93 470.74 399.04 471.61 379.16 472.37C374.16 472.59 369.24 472.85 364.3 473.22C359.36 473.59 354.43 474.04 349.59 474.86C347.189 475.258 344.814 475.802 342.48 476.49C341.34 476.843 340.218 477.254 339.12 477.72C338.06 478.19 336.95 478.77 335.83 479.33C331.346 481.763 326.552 483.576 321.58 484.72C316.468 485.836 311.156 485.622 306.15 484.1C303.7 483.35 301.42 482.53 299.06 481.92C296.701 481.306 294.311 480.818 291.9 480.46C287.139 479.539 282.264 479.367 277.45 479.95C274.915 480.297 272.358 480.454 269.8 480.42C267.24 480.42 264.8 480.2 262.49 480.42C257.54 480.85 252.55 481.29 247.49 481.48C242.432 481.707 237.365 481.472 232.35 480.78C222.5 479.23 212.68 478.2 202.77 477.43C182.96 475.92 163.08 475.19 143.22 475.11C123.36 475.03 103.46 475.84 83.5999 477.04C63.7399 478.24 43.9999 479.82 24.1299 481.73Z',
      ],
      Array.from(catBlanketPaths).map((path) => path.getAttribute('d')),
      [
        'M24.1299 481.73C34.0099 480.397 43.9066 479.26 53.8199 478.32C63.7399 477.32 73.6599 476.41 83.5999 475.65C103.48 474.15 123.397 473.23 143.35 472.89C148.35 472.89 153.35 472.8 158.35 472.89C163.35 472.98 168.35 473.07 173.35 473.23C183.35 473.52 193.26 473.8 203.24 474.23C208.24 474.48 213.24 474.76 218.24 475.23C220.74 475.48 223.24 475.79 225.76 476.23C227.02 476.47 228.28 476.74 229.54 477.11C230.16 477.29 230.8 477.51 231.42 477.75L233.18 478.47C237.621 480.519 242.254 482.127 247.01 483.27C251.634 484.371 256.468 484.212 261.01 482.81C263.286 481.923 265.515 480.922 267.69 479.81C270.053 478.714 272.537 477.899 275.09 477.38C277.637 476.87 280.232 476.632 282.83 476.67C285.378 476.74 287.919 476.964 290.44 477.34L297.83 478.29C300.29 478.59 302.74 478.88 305.15 478.98C307.56 479.08 310.01 478.92 312.5 478.82C314.99 478.72 317.45 478.59 319.91 478.4C324.822 478.023 329.703 477.315 334.52 476.28C336.92 475.78 339.38 475.21 341.84 474.74C344.3 474.27 346.78 473.83 349.25 473.46C359 472 369 471.18 379 470.6C398.93 469.47 418.88 469.11 438.82 469.69C448.82 470.03 458.773 470.587 468.68 471.36C478.587 472.133 488.5 473.133 498.42 474.36C458.774 470.545 418.879 470.046 379.15 472.87C374.203 473.223 369.257 473.667 364.31 474.2C359.38 474.72 354.45 475.32 349.57 476.1C347.12 476.48 344.69 476.92 342.26 477.4C339.83 477.88 337.44 478.4 334.97 478.97C330.037 480.065 325.036 480.82 320 481.23C317.49 481.44 315 481.58 312.5 481.7C310 481.82 307.5 481.98 304.92 481.89C302.34 481.8 299.84 481.51 297.36 481.22L289.93 480.3C287.522 479.946 285.094 479.742 282.66 479.69C280.272 479.661 277.889 479.889 275.55 480.37C273.214 480.851 270.945 481.61 268.79 482.63C266.516 483.79 264.179 484.822 261.79 485.72C256.749 487.265 251.386 487.431 246.26 486.2C241.326 485.012 236.523 483.337 231.92 481.2L230.22 480.49C229.69 480.28 229.14 480.09 228.58 479.93C227.45 479.59 226.27 479.32 225.09 479.09C222.7 478.64 220.26 478.33 217.81 478.09C213 477.54 208 477.24 203 477C193.07 476.49 183.12 476.16 173.17 475.82C163.22 475.48 153.29 475.25 143.34 475.21C123.44 475.21 103.54 475.94 83.6699 477.13C63.7999 478.32 43.9999 479.82 24.1299 481.73Z',
      ],
      Array.from(catBlanketPaths).map((path) => path.getAttribute('d')),
    ];

    const catEyesFrames = [
      [
        'M260.78 180C260.78 193.93 251.41 205.22 239.84 205.22C228.27 205.22 218.9 193.9 218.9 180C218.9 178.94 219.22 177 219.53 176.95C220.19 176.95 218.95 185.65 222.72 192.8C225.67 198.4 232.72 204.93 240.99 204.25C250.09 203.5 255.19 194.57 255.99 193.2C260.26 185.74 259.57 176.9 260.27 176.95C260.59 176.94 260.78 178.89 260.78 180Z',
        'M332 178.1C332 192.03 322.62 203.32 311.06 203.32C299.5 203.32 290.13 192 290.13 178.1C290.13 177.04 290.45 175.1 290.76 175.1C291.42 175.1 290.17 183.8 293.94 190.95C296.89 196.55 303.94 203.07 312.22 202.39C321.31 201.65 326.42 192.72 327.22 191.39C331.49 183.92 330.8 175.09 331.51 175.13C331.82 175.07 332 177 332 178.1Z',
      ],
      Array.from(catEyesPaths).map((path) => path.getAttribute('d')),
    ];

    const tl1 = gsap.timeline({
      ease: 'power1.inOut',
      repeat: -1,
    });

    catPawRightFrames.forEach((frame) => {
      catPawRightPaths.forEach((path, pathIndex) => {
        tl1.to(path, {
          morphSVG: frame[pathIndex],
          duration: CatAnimated.pawsDuration,
        }, pathIndex ? `-=${CatAnimated.pawsDuration}` : null);
      });
    });

    catPawLeftFrames.forEach((frame) => {
      catPawLeftPaths.forEach((path, pathIndex) => {
        tl1.to(path, {
          morphSVG: frame[pathIndex],
          duration: CatAnimated.pawsDuration,
        }, pathIndex ? `-=${CatAnimated.pawsDuration}` : null);
      });
    });

    catBlanketFrames.forEach((frame, frameIndex) => {
      catBlanketPaths.forEach((path, pathIndex) => {
        tl1.to(path, {
          morphSVG: frame[pathIndex],
          duration: CatAnimated.pawsDuration,
        }, frameIndex * CatAnimated.pawsDuration + (frameIndex % 2 === 0 ? -0.08 : 0.08));
      });
    });

    const tl2 = gsap.timeline({
      ease: 'power1.inOut',
      repeat: -1,
    });

    catEyesFrames.forEach((frame, frameIndex) => {
      catEyesPaths.forEach((path, pathIndex) => {
        tl2.to([path, catEyesClipPaths[pathIndex]], {
          morphSVG: frame[pathIndex],
          duration: CatAnimated.eyesDuration,
        }, frameIndex === 0 ? 3 : 3 + frameIndex * CatAnimated.eyesDuration);
      });
    });
  }
}

customElements.define('cat-animated', CatAnimated);
