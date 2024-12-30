import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-around">
        <div className="mb-4 md:mb-0 space-y-4">
          <h3 className="text-lg font-bold text-[#90EE90]">Explore</h3>
          <ul className="text-sm">
            <li>
              <a href="/about" className="hover:text-[#90EE90]">
                About Us
              </a>
            </li>
            <li>
              <a href="/campaigns" className="hover:text-[#90EE90]">
                Campaigns
              </a>
            </li>
            <li>
              <a href="/news" className="hover:text-[#90EE90]">
                News & Updates
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-4 md:mb-0 space-y-4">
          <h3 className="text-lg font-bold text-[#90EE90]">Take Action</h3>
          <ul className="text-sm">
            <li>
              <a href="/plant-trees" className="hover:text-[#90EE90]">
                Plant Trees
              </a>
            </li>
            <li>
              <a href="/reduce-carbon" className="hover:text-[#90EE90]">
                Reduce Carbon
              </a>
            </li>
            <li>
              <a href="/recycle" className="hover:text-[#90EE90]">
                Recycle Waste
              </a>
            </li>
            <li>
              <a href="/disaster-prediction" className="hover:text-[#90EE90]">
                Risk Alert
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-4 md:mb-0 space-y-4">
          <h3 className="text-lg font-bold text-[#90EE90]">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center align-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" />
                <rect x="3" y="5" width="18" height="14" rx="2" />
              </svg>
              <span>info@greenearth.org</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 64 64"
                fill="none"
                stroke="#ffffff" // Stroke color set to white
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <g>
                  <path d="M5.7783,24.7686c1.9902,1.085,5.0967,0.269,8.0811-0.6533c4.8364-1.3472,7.019-2.6401,7.168-6.7412c0.0034-0.1011-0.0083-0.2021-0.0352-0.2998c-0.0029-0.0122,0.0063-0.1108,0.1294-0.2905c0.7661-1.1177,3.6714-2.4893,7.2095-2.8501c0.9307-0.0977,1.9409-0.1489,2.9951-0.1523c1.0571,0.0034,2.0674,0.0547,3.0049,0.1523c3.5352,0.3608,6.4395,1.7324,7.2061,2.8501c0.123,0.1797,0.1328,0.2783,0.1289,0.2905c-0.0264,0.0972-0.0381,0.1982-0.0342,0.2988c0.1445,4.1001,2.3271,5.3936,7.1377,6.7344c1.9893,0.6147,4.0195,1.1802,5.7432,1.1802c0.8848,0,1.6895-0.1494,2.3652-0.5176c1.4609-0.7915,2.2539-3.3052,2.417-4.1216c1.3721-6.8125-3.7441-12.9063-9.0781-15.6851C45.3633,2.4341,38.3145,0.9468,31.3296,1.001c-6.9517-0.0498-14.0381,1.4336-18.8872,3.9624c-5.3335,2.7783-10.4502,8.8721-9.0811,15.686C3.5264,21.4678,4.3257,23.9814,5.7783,24.7686z M13.3667,6.7368c4.5747-2.3862,11.2939-3.7954,17.9561-3.7358c0.0039,0,0.0098,0,0.0137,0c6.6821-0.0381,13.3774,1.3501,17.9565,3.7358c4.6914,2.4443,9.209,7.7168,8.041,13.519c-0.2002,1.0054-0.8896,2.4741-1.4111,2.7568c-1.4189,0.7725-4.8926-0.3003-6.5898-0.8242c-4.7744-1.3306-5.5859-2.2759-5.6982-4.7632c0.0791-0.4399,0.0391-1.062-0.4482-1.7725c-1.2266-1.7891-4.7842-3.314-8.6504-3.7085c-1.002-0.1045-2.0796-0.1597-3.21-0.1631c-1.1279,0.0039-2.2061,0.0586-3.2012,0.1631c-3.8682,0.3945-7.4263,1.9194-8.6528,3.708c-0.4873,0.7104-0.5273,1.3325-0.4487,1.7725c-0.1143,2.4883-0.9272,3.4341-5.728,4.7715c-1.6694,0.5161-5.1431,1.5889-6.562,0.8149c-0.5171-0.2798-1.2085-1.7505-1.4116-2.7568C4.1563,14.4536,8.6748,9.1812,13.3667,6.7368z" />
                  <path d="M61.5771,54.4614l-3.1309-19.0518c-0.8037-4.9136-4.1641-8.2148-8.3623-8.2148h-9.3481l-1.313-5.1528c-0.5342-2.1182-1.8789-3.3823-3.5967-3.3823H27.498c-1.7393,0-3.0513,1.2319-3.5996,3.3799l-1.314,5.1553h-8.8257c-4.1934,0-7.5542,3.3008-8.3628,8.2139L2.4893,53.0884c-0.6113,3.7251-0.2471,6.314,1.1128,7.915c1.6968,1.9971,4.4331,1.9941,6.9116,1.9961h42.7012L53.5371,63c0.1074,0,0.2139,0,0.3213,0c2.4238,0,5.0947-0.0757,6.6797-1.9399C61.7354,59.6523,62.0752,57.4941,61.5771,54.4614z M25.8364,22.5337c0.1787-0.6997,0.6323-1.874,1.6616-1.874h8.3281c1.0313,0,1.4805,1.1729,1.6582,1.874l1.1875,4.6611H24.6484L25.8364,22.5337z M59.0146,59.7642C57.959,61.0059,55.7178,61.0039,53.54,61l-42.9087-0.0005h-0.1182c-2.0977,0-4.2891,0.001-5.3867-1.291c-0.9434-1.1108-1.167-3.229-0.6636-6.2959l2.9067-17.6792c0.4961-3.0166,2.4673-6.5386,6.3892-6.5386H50.084c3.9268,0,5.8955,3.5215,6.3887,6.5381l3.1318,19.0527C59.9951,57.1694,59.7969,58.8442,59.0146,59.7642z" />
                </g>
              </svg>

              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 22 22"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                />
              </svg>
              <span>123 Greenway Rd, Eco City</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 text-center mt-6 text-sm border-t-2 border-gray-300">
        <p>
          &copy; {new Date().getFullYear()} Green Earth Initiative. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
