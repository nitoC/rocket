import { useState, useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCaretDown } from "react-icons/rx";
import { FaDiscord } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaReddit, FaYoutube } from 'react-icons/fa';
import { FaGithub } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { TbTransferVertical } from "react-icons/tb";

import './App.css'

function App() {
  let eth = {
    name: "ETH",
    icon: "eth.png",
    usd: "0.00",

  }
  let reth = {
    name: "rETH",
    icon: "reth.svg",
    usd: "0.00",
  }
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [initialize, setinitialize] = useState({
    first: eth,
    second: reth
  })

  const [ethState, setethState] = useState('0.00')
  const [rethState, setrethState] = useState('0.00')
  const [ethVal, setethVal] = useState('0.00')
  const [ethVals, setethVals] = useState('0.00')
  const [rethVal, setrethVal] = useState('0.00000')


  const handleEth = async (e) => {
    const ethData = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,RETH')
    let data = await ethData.json()
    console.log(data.USD)
    console.log(data.RETH, 'reth')
    console.log(rethVal)
    setrethVal(parseFloat(data.RETH) * parseFloat(e.target.value))
    setethState(parseFloat(e.target.value) * parseFloat(data.USD))
    setrethState(parseFloat(e.target.value) * parseFloat(data.USD))
  }
  const handleReth = async (e) => {
    const rethData = await fetch('https://min-api.cryptocompare.com/data/price?fsym=rETH&tsyms=BTC,USD,ETH')

    let data = await rethData.json()
    setethVal(parseFloat(data.ETH) * parseFloat(e.target.value))

    setrethState(parseFloat(e.target.value) * parseFloat(data.USD))
    setethState(parseFloat(e.target.value) * parseFloat(data.USD))

    //setrethState(e.target.value)
  }

  const handleToggle = () => {
    setrethVal('')
    setethVal('')
    if (initialize.first.name === 'ETH') {
      setinitialize({ first: reth, second: eth })
    } else {
      setinitialize({ first: eth, second: reth })
    }
  }
  const handleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDarkTheme(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const fetchCost = async () => {

      const ethData = await fetch('https://min-api.cryptocompare.com/data/price?fsym=rETH&tsyms=BTC,USD,ETH')
      let data = await ethData.json()
      console.log(data.ETH)
      setethVal(data.ETH)
    }
    fetchCost()


  }, [])


  return (
    <div className={`container ${isDarkTheme ? 'dark' : 'light'}`}>
      <header className='header'>
        <div className='logo-container'>
          <img className='logo' src='rocket.webp' alt='logo' />
        </div>
        <div className='hamburger-container'>
          <GiHamburgerMenu size={20} />
        </div>
      </header>
      <div className='stake-body'>
        <div className='stake'>
          <div className='stake-heading'>
            Stake {initialize.first.name}
          </div>
          <div className='stake-input-container'>
            <div className='stake-image'><img src={initialize.first.icon} alt='crypto icons' className='stake-icon' /></div>
            <input onChange={initialize.first.name === 'ETH' ? handleEth : handleReth} type="number" className='stake-input' placeholder='0.00' readOnly={initialize.first.readOnly && ethVal} />
            <div className='stake-input-text'>
              ≈ ${isNaN(ethState) || typeof ethState !== 'number' ? "0.00" : ethState} USD
            </div>
          </div>
          <div className='toggle-wrapper'>
            <div className='toggle' onClick={handleToggle}>
              <TbTransferVertical />
            </div>
          </div>
        </div>
        <div className='stake'>
          <div className='stake-heading'>
            Receive {initialize.second.name}
          </div>
          <div className='stake-input-container'>
            <div className='stake-image'><img src={initialize.second.icon} alt='crypto icons' className='stake-icon' /></div>
            <input onChange={initialize.second.name === 'rETH' ? handleEth : handleReth} type="number" className='stake-input' placeholder='0.000000' readOnly value={initialize.second.name === 'rETH' ? rethVal : ethVal} />
            <div className='stake-input-text'>
              ≈ ${isNaN(rethState) || typeof rethState !== 'number' ? "0.00" : rethState} USD
            </div>
          </div>
          <div className='stake-sub-menu-container'>
            <div className='stake-sub-menu'>
              <p className='sub-text'>Routing</p>
              <button className='sub-btn'>

                <span className='sub-top'>Protocol</span>
                <span className='sub-icon'>
                  <RxCaretDown />
                </span>
              </button>
            </div>
            <div className='stake-sub-menu'>
              <p className='sub-text'>Exchange Rate</p>
              <button className='sub-btn'>

                1 rETH = {ethVal} ETH
                <span className='sub-icon'>
                  <RxCaretDown />
                </span>
              </button>
            </div>
            <div className='stake-sub-menu'>
              <p className='sub-text'>Average Return</p>
              <button className='sub-btn'>

                <span className='sub-primary'>≈ 2.92%
                </span> APR
                <span className='sub-icon'>
                  <RxCaretDown />
                </span>
              </button>
            </div>
            <div className='stake-sub-cost'>
              <span>Transaction Cost</span>
              <span className='cost-container'>
                <div className='cost'>
                  0.00950 ETH (≈ $33.66 USD)
                </div>
                <div>
                  @ 19 gwei <span className='cost-tag'>Low</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div className='connect-btn-container'>
          <button className='connect-btn'>Connect</button>
        </div>
      </div>
      <footer className='footer'>
        <div className='footer-desc'>
          <p className='footer-desc-text'><span className='sub-primary'>811,040</span> ETH staking across <span className='sub-primary'>3,636</span> node operators in <span className='sub-primary'>140</span> regions with node commission rate of  <span className='sub-primary'>14%</span></p>
        </div>

        <div className='footer-logo-container'>
          <img className='footer-logo' src='rocket.webp' alt='footer logo' />
          <p className='logo-text sub-primary'>Rocket Pool
          </p>
        </div>
        <p className='footer-desc-text'>Decentralised Ethereum Liquid Staking Protocol</p>
        <div className='footer-socials'>
          <a className='social-link' href='#'>
            <FaDiscord />
          </a>
          <a className='social-link' href='#'>
            <FaMedium />
          </a>
          <a className='social-link' href='#'>
            <FaGithub />
          </a>
          <a className='social-link' href='#'>
            <FaYoutube />
          </a>
          <a className='social-link' href='#'>
            <FaReddit />
          </a>
        </div>
        <div className='footer-links'>
          <a className='footer-link' target="_blank" rel="noopener noreferrer" href="#">Privacy Policy</a>
          <a className='footer-link' target="_blank" rel="noopener noreferrer" href="#">Terms of Service</a>
        </div>
        <div className='copy'>
          &copy; Rocket Pool Pty Ltd.
        </div>
        <div className='theme'>
          <div onClick={handleTheme} className='theme-container'>
            <div className='theme-left'>
              {

                !isDarkTheme ? <div className='theme-cover'></div> :


                  <IoMoonOutline size={20} />
              }
            </div>
            <div className='theme-right'>
              {
                isDarkTheme ? <div className='theme-cover'></div> :
                  <FiSun size={20} />
              }

            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
