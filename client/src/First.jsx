import React from "react";
import { useEffect, useState } from "react";
import getWeb3 from "./getWeb3";
import "./index.css";
import logo from "./logo.png";
import group from "./Group 36629.png";
import group1 from "./Group 34928.png";
import png1 from "./1.png";
import png2 from "./2.png";
import png3 from "./3.png";
import crop from "./crop.png";
import crop2png from "./crop2.PNG";
import snip1 from "./snip1.png";
import mern from "./mern-removebg-preview.png";
import Web3 from "web3";
import { abi, cont_add } from "./contracts/Minting_contract";

export default function First() {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null };
  const [_address, setAddress] = useState(null);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [IDs, setNetworkID] = useState(false);

  useEffect(async () => {
    if (!window.ethereum) {
      return;
    }
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    setNetworkID(networkId);
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      alert(
        "it looks like that you dont have metamask installed,<br>please install"
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      // setNetworkID(networkId);
      console.log(networkId);
      if (networkId == 1) {
        console.log("its in net");
        setisWalletConnected(true);

        setAddress(window.ethereum.selectedAddress);
      } else {
        alert(`change your network to Ethereum`);
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }

  async function Mint() {
    const amount = 1;
    console.log("hello janju" + isWalletConnected);
    if (!isWalletConnected) {
      alert("kindly Connect your wallet to mint");
      return;
    }
    if (!window.ethereum) {
      alert(
        "it looks like that you dont have metamask installed,<br>please install"
      );
      return;
    }

    const web3 = new Web3(window.ethereum);
    console.log("hello janju");
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    if (networkId == 1) {
      // const deployedNetwork = mintingContract.networks[networkId];
      const contract = new web3.eth.Contract(abi, 1 && cont_add);
      if (!window.ethereum) {
        alert(
          "it looks like that you dont have metamask installed,<br>please install"
        );
        return;
      }
      var Presale_End_Time = await contract.methods.Presale_End_Time().call();
      var curr_time = await contract.methods.curr_time().call();
      let PresaleCost = parseInt(await contract.methods.presaleCost().call());
      let isOwner = await contract.methods.owner().call();
      let iswhitelisted = await contract.methods
        .whitelisted(accounts[0])
        .call();
      let cost = parseInt(await contract.methods.cost().call());
      var userBalance = parseInt(await web3.eth.getBalance(accounts[0]));
      // userBalance=web3.utils.fromWei(userBalance.toString(),'ether');
      // cost=web3.utils.fromWei(cost.toString(),'ether');

      if (isOwner == accounts[0]) {
        console.log("hellobeeerrr");
        contract.methods
          .mint(accounts[0], amount)
          .send({ from: accounts[0], value: "0" });
      } else if (iswhitelisted == true) {
        console.log("h1");
        if (amount > 1) {
          console.log("h1");
          if (Presale_End_Time > curr_time) {
            console.log("h2");

            if (userBalance <= PresaleCost * (amount - 1)) {
              console.log(userBalance);
              alert("you don't have enough balance to buy");
              return;
            }

            contract.methods
              .mint(accounts[0], amount)
              .send({ from: accounts[0], value: PresaleCost * (amount - 1) });
          } else {
            if (userBalance <= cost) {
              console.log(userBalance);
              alert("you don't have enough balance to buy");
              return;
            }
            contract.methods
              .mint(accounts[0], amount)
              .send({ from: accounts[0], value: cost * (amount - 1) });
          }
        } else {
          console.log("h3");

          contract.methods
            .mint(accounts[0], amount)
            .send({ from: accounts[0] });
        }
      } else if (Presale_End_Time > curr_time) {
        if (userBalance <= PresaleCost) {
          console.log(userBalance);
          alert("you don't have enough balance to buy");
          return;
        }

        contract.methods
          .mint(accounts[0], amount)
          .send({ from: accounts[0], value: PresaleCost * amount });
      } else {
        if (userBalance <= cost) {
          console.log(userBalance);
          alert("you don't have enough balance to buy");
          return;
        }

        contract.methods
          .mint(accounts[0], amount)
          .send({ from: accounts[0], value: cost * amount });
      }
    } else {
      alert("change your network to ethereum");
    }
  }
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", handleChainChanged);

    window.ethereum.on("chainChanged", handleChainChanged);
  }

  function handleChainChanged(_chainId) {
    window.location.reload();
  }

  return (
    <>
      <header className="main_header_area">
        {/* Navbar Area Start */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid contHead">
            <a className="navbar-brand" href="index.html">
              <img className="img1" src={logo} alt="logo" />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {/* <span className="navbar-toggler-icon"></span> */}
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto text-center">
                <li className="nav-item active">
                  <a className="nav-link" href="#home">
                    Home
                  </a>
                </li>

                <li className="nav-item active">
                  <a className="nav-link" href="#aboutus">
                    About Us
                  </a>
                </li>

                <li className="nav-item active">
                  <a className="nav-link" href="#collection">
                    Collection
                  </a>
                </li>

                <li className="nav-item active">
                  <a className="nav-link" href="#roadmap">
                    Roadmap
                  </a>
                </li>

                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Club Zone
                  </a>
                </li>

                <li className="nav-item active">
                  <a className="nav-link" href="#team">
                    Team
                  </a>
                </li>

                <li className="nav-item active">
                  <a className="nav-link" href="#faq">
                    FAQ's
                  </a>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto text-center">
                <li className="nav-item active d-flex justify-content-center sIcons">
                  <a href="https://discord.gg/Jub82XUY9e" className="nav-link">
                    <i className="fa fa-github-alt mt-4" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://twitter.com/whoisleocino"
                    className="nav-link"
                  >
                    <i className="fa fa-twitter mt-4" aria-hidden="true"></i>
                  </a>

                  <a
                    href="https://www.instagram.com/whoisleocino/"
                    className="nav-link"
                  >
                    <i className="fa fa-instagram mt-4" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="nav-item active">
                  <button
                    type="button"
                    className="btn btn-primary-1"
                    onClick={Mint}
                    style={{ fontSize: 17 }}
                  >
                    (0.08eth) Mint
                  </button>
                </li>

                <li className="nav-item active">
                  <button
                    type="button"
                    className="btn btn-pink ml-10"
                    onClick={connectWallet}
                    id="connect_wallet"
                  >
                    {!_address ? "Connect Wallet" : _address.slice(0, 10)}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Navbar Area End  */}

        <div>
          <div className="container">
            <div className="img-container"></div>
            <img src={group} className="img2" alt="" id="home" />
            <div className="row mt-50" id="aboutus">
              <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 mt-50">
                <img src={group1} className="img2" alt="" />
              </div>
              <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 mt-50">
                <h2>About us</h2>
                <p>
                  Explore the inner child within you with Leocinos, a collection
                  of 10,000 unique NFTs on the ethereum blockchain. Leocinos are
                  kids with a bright sense of imagination, their love for
                  exploration and fun is what makes them special. A Leocino can
                  be any special character they wish to be, from being a
                  policeman to astronaut.
                </p>
                <p>
                  {" "}
                  All Leocinos are custom generated with more than 100
                  hand-drawn traits and high rarity scores. They also have many
                  cool acessories and outfits, such as turbans, hats,
                  headphones, goggles and many others.
                </p>
                <a href="https://discord.gg/Jub82XUY9e">
                  <button className="btn btn-pink" type="button">
                    <i className="fa fa-github-alt" aria-hidden="true"></i> Mint{" "}
                  </button>
                </a>
              </div>
            </div>

            <div className="container mt-50">
              <div className="row text-center mt-50" id="collection">
                <div className="col-md-12 mb-5">
                  <h2 className="mb-2">Collection</h2>
                  <p className="img13">
                    While there are 10,000 Leocinos in collection, the following
                    Leocinos are special favourites:
                  </p>

                  <ul type="desc" className="img8">
                    <li>Leocino Police</li>
                    <li>Leocino Sherlock Holmes</li>
                    <li>Leocino Turban</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="container">
              <div
                id="multi-item-example"
                className="carousel slide carousel-multi-item"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#multi-item-example"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li data-target="#multi-item-example" data-slide-to="1"></li>
                  <li data-target="#multi-item-example" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <div className="row sm-text-center">
                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img src={png2} className="img3" />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img4" src={png1} />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img3" src={png3} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="row sm-text-center">
                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img3" src={png2} />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img4" src={png1} />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img3" src={png3} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="row sm-text-center">
                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img3" src={png2} />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img4" src={png1} />
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4">
                        <div className="mb-2">
                          <img className="img3" src={png3} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    className="carousel-control-prev"
                    href="#multi-item-example"
                    data-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#multi-item-example"
                    data-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </a>
                </div>
              </div>
            </div>
            <div id="roadmap">
              <div className="roadmap flex flex-col">
                <p className="img6">
                  Stay tuned to our roadmap, where we will share more
                  opportunities, events and special surprises for our minters.
                </p>
                <div className="flex">
                  <div className="left flex ">
                    <div className="img7-1">Roadmap</div>
                    {/* <div className="road-1 road-map-1 img9-1">
                  <p className="img7-1" >Roadmap</p>
                </div> */}
                  </div>
                  <div className="right flex "></div>
                  <div className="f1 flex col-lg-8 col-md-8 col-xs-12 col-sm-12">
                    <ul className="timeline">
                      <li className="fst li-bg">
                        <h2>GIVEAWAYS</h2>
                        <ul type="desc" className="img8">
                          <li>
                            500 NFTs sold: One lucky winner who retweets us
                            stands a chance to win 1 ETH{" "}
                          </li>
                          <li>
                            {" "}
                            1000 NFTs sold: A club zone will be built for our
                            community members on our NFT website
                          </li>
                          <li>
                            {" "}
                            2000 NFTs sold: One lucky winner who retweets us
                            gets to receive 2 ETH
                          </li>
                          <li>
                            5000 NFTs sold: One lucky winner can win ETH worth
                            up to US$5000
                          </li>
                        </ul>
                      </li>
                      <li className="nd li-bg">
                        <h2>Charity</h2>
                        <ul type="desc" className="img8">
                          <li>
                            {" "}
                            3000 NFTs sold: US$20,000 will be donated to a child
                            care organisation{" "}
                          </li>
                          <li>
                            6000 NFTs sold: Funds will be donated to Ukraine to
                            help with their war efforts{" "}
                          </li>

                          <li>
                            8000 NFTs sold: US$20,000 will be donated to a child
                            care organisation
                          </li>
                        </ul>
                      </li>
                      <li className="rd li-bg">
                        <h2>V.I.P EVENTS</h2>
                        <ul type="desc" className="img8">
                          <li>
                            9000 NFTs sold: Enhance our NFT branding by planning
                            a visit to Miami, the crypto capital of the United
                            States{" "}
                          </li>
                          <li>
                            {" "}
                            10000 NFTs sold: Brand enhancement through billboard
                            advertising at Times Square, New York City{" "}
                          </li>
                        </ul>
                      </li>
                      <li className="fth li-bg">
                        <h2>Special events</h2>
                        <ul type="desc" className="img8">
                          <li>
                            4000 NFTs sold: Money will be added at FTX Arena in
                            Miami with special surprises{" "}
                          </li>
                          <li>
                            {" "}
                            7000 NFTs sold: A metaverse community will be built,
                            to introduce more projects in the metaverse within
                            their ecosystem. Our collection will grow as Leocino
                            grows. We will start working on our next project
                            which consists of grown Leocinos in 3D, with new
                            traits and features.
                          </li>
                        </ul>
                      </li>
                      {/* <!--    	<li className="ffth li-bg"> 
                
                <h2>Stage:5</h2>
                <ul type="desc" className="img8">
<li>500 NFTs sold: One lucky winner who retweets us stands a chance to win 1 ETH </li>
<li> 1000 NFTs sold: A club zone will be built for our community members on our NFT website</li>
<li> 2000 NFTs sold: One lucky winner who retweets us gets to receive 2 ETH</li>
<li>5000 NFTs sold: One lucky winner can win ETH worth up to US$5000</li>

</ul>
            </li> --> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-100">
            <div className="row justify-content-center text-center" id="team">
              <div className="col-md-8 col-lg-6">
                <div className="header-section">
                  <h2 className="img10">Our Team Members</h2>
                </div>
              </div>
            </div>

            <section className="customer-logos slider  mt-50">
              <div className="slide">
                <div className="single-person ">
                  <div className="person-image">
                    <img src={crop2png} alt="" />
                  </div>
                  <div className="person-info">
                    <h3 className="full-name">Boris</h3>
                    <span className="speciality">Owner</span>
                  </div>
                  {/* <div className="social-links">
                    <a href="#">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-google-plus fa-lg"></i>
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="slide">
                <div className="single-person">
                  <div className="person-image">
                    <img src={snip1} alt="" />
                  </div>
                  <div className="person-info">
                    <h3 className="full-name">Hamza</h3>
                    <span className="speciality">Artist</span>
                  </div>
                  {/* <div className="social-links">
                    <a href="#">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-google-plus fa-lg"></i>
                    </a>
                  </div> */}
                </div>
              </div>

              <div className="slide">
                {" "}
                <div className="single-person">
                  <div className="person-image">
                    <img src={crop} alt="" />
                  </div>
                  <div className="person-info">
                    <h3 className="full-name">Fahad</h3>
                    <span className="speciality">Developer & Marketer</span>
                  </div>
                  <div className="social-links">
                    <a href="https://www.fiverr.com/fahadproo" target="_blank">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    {/* 
                    <a href="#">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-google-plus fa-lg"></i>
                    </a>*/}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="row mt-100" id="faq">
            <div className="col-lg-2 col-md-2 col-xs-12 col-sm-12"></div>
            <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12">
              <h2 className="img16">Frequently Asked Questions </h2>
              {/* <!--Accordion wrapper--> */}
              <div
                className="accordion md-accordion  mt-50 img10"
                id="accordionEx1"
                role="tablist"
                aria-multiselectable="true"
              >
                {/* <!-- Accordion card --> */}
                <div className="card">
                  {/* <!-- Card header --> */}
                  <div className="card-header" role="tab" id="headingTwo1">
                    <a
                      className="collapsed img10"
                      data-toggle="collapse"
                      data-parent="#accordionEx1"
                      href="#collapseTwo1"
                      aria-expanded="false"
                      aria-controls="collapseTwo1"
                    >
                      <h5 className="mb-0">
                        Who is Leocino?{" "}
                        <i
                          className="fa fa-chevron-circle-down  icon-right"
                          aria-hidden="true"
                        ></i>
                      </h5>
                    </a>
                  </div>

                  {/* <!-- Card body --> */}
                  <div
                    id="collapseTwo1"
                    className="collapse"
                    role="tabpanel"
                    aria-labelledby="headingTwo1"
                    data-parent="#accordionEx1"
                  >
                    <div className="card-body img10">
                      Think of Leocinos as kids who loves to play imaginative
                      characters, from becoming a policeman to astronaut.
                    </div>
                  </div>
                </div>

                {/* <!-- Accordion card -->

<!-- Accordion card --> */}
                <div className="card">
                  {/* <!-- Card header --> */}
                  <div className="card-header" role="tab" id="headingTwo2">
                    <a
                      className="collapsed img10"
                      data-toggle="collapse"
                      data-parent="#accordionEx1"
                      href="#collapseTwo21"
                      aria-expanded="false"
                      aria-controls="collapseTwo21"
                    >
                      <h5 className="mb-0">
                        How do I join the community?{" "}
                        <i
                          className="fa fa-chevron-circle-down  icon-right"
                          aria-hidden="true"
                        ></i>
                      </h5>
                    </a>
                  </div>

                  {/* <!-- Card body --> */}
                  <div
                    id="collapseTwo21"
                    className="collapse"
                    role="tabpanel"
                    aria-labelledby="headingTwo21"
                    data-parent="#accordionEx1"
                  >
                    <div className="card-body img10">
                      Leocino artworks make great profile pictures, so you can
                      easily spot fellow community members on social media! Feel
                      free to follow each other and say hi.
                    </div>
                  </div>
                </div>
                {/* <!-- Accordion card -->

<!-- Accordion card --> */}
                <div className="card">
                  {/* <!-- Card header --> */}
                  <div className="card-header" role="tab" id="headingThree31">
                    <a
                      className="collapsed img10"
                      data-toggle="collapse"
                      data-parent="#accordionEx1"
                      href="#collapseThree31"
                      aria-expanded="false"
                      aria-controls="collapseThree31"
                    >
                      <h5 className="mb-0">
                        What is the status of the project?{" "}
                        <i
                          className="fa fa-chevron-circle-down  icon-right"
                          aria-hidden="true"
                        ></i>
                      </h5>
                    </a>
                  </div>

                  {/* <!-- Card body --> */}
                  <div
                    id="collapseThree31"
                    className="collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree31"
                    data-parent="#accordionEx1"
                  >
                    <div className="card-body img10">
                      Join our Discord or follow us on Twitter and Instagram for
                      updates.
                    </div>
                  </div>
                </div>
                {/* <!-- Accordion card --> */}
                <div className="card">
                  {/* <!-- Card header --> */}
                  <div className="card-header" role="tab" id="headingThree32">
                    <a
                      className="collapsed img10"
                      data-toggle="collapse"
                      data-parent="#accordionEx1"
                      href="#collapseThree33"
                      aria-expanded="false"
                      aria-controls="collapseThree33"
                    >
                      <h5 className="mb-0">
                        How to purchase?{" "}
                        <i
                          className="fa fa-chevron-circle-down  icon-right"
                          aria-hidden="true"
                        ></i>
                      </h5>
                    </a>
                  </div>

                  {/* <!-- Card body --> */}
                  <div
                    id="collapseThree33"
                    className="collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree32"
                    data-parent="#accordionEx1"
                  >
                    <div className="card-body img10">
                      The easiest way to mint a Leocino is to install a MetaMask
                      extension on your Chrome browser and link your ethereum
                      wallet to it. Ensure you have enough ETH in your wallet to
                      cover the cost of a NFT, including the associated gas
                      fees. Approve the transaction on MetaMask and you are all
                      set. The Leocino will be available to mint on our official
                      website.
                    </div>
                  </div>
                </div>

                <div className="card">
                  {/* <!-- Card header --> */}
                  <div className="card-header" role="tab" id="headingThree32">
                    <a
                      className="collapsed img10"
                      data-toggle="collapse"
                      data-parent="#accordionEx1"
                      href="#collapseThree34"
                      aria-expanded="false"
                      aria-controls="collapseThree34"
                    >
                      <h5 className="mb-0">
                        What is NFT?{" "}
                        <i
                          className="fa fa-chevron-circle-down  icon-right"
                          aria-hidden="true"
                        ></i>
                      </h5>
                    </a>
                  </div>

                  {/* <!-- Card body --> */}
                  <div
                    id="collapseThree34"
                    className="collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree32"
                    data-parent="#accordionEx1"
                  >
                    <div className="card-body img10">
                      NFT stands for “Non-fungible token” and is a cool way of
                      saying it’s a truly unique digital item that YOU can buy,
                      own, and trade.
                    </div>
                  </div>
                </div>

                <div className="card">
                  {/* <!-- Card header --> */}
                  <div className="card-header" role="tab" id="headingThree32">
                    <a
                      className="collapsed img10"
                      data-toggle="collapse"
                      data-parent="#accordionEx1"
                      href="#collapseThree32"
                      aria-expanded="false"
                      aria-controls="collapseThree32"
                    >
                      <h5 className="mb-0">
                        Where can I see my NFT Leocino after purchase?{" "}
                        <i
                          className="fa fa-chevron-circle-down  icon-right"
                          aria-hidden="true"
                        ></i>
                      </h5>
                    </a>
                  </div>

                  {/* <!-- Card body --> */}
                  <div
                    id="collapseThree32"
                    className="collapse"
                    role="tabpanel"
                    aria-labelledby="headingThree32"
                    data-parent="#accordionEx1"
                  >
                    <div className="card-body img10">
                      Your Leocino Ape NFT will appear in metamask wallet. You
                      can also see your freshly minted NFT art directly on your
                      Opensea.io account.
                    </div>
                  </div>
                </div>

                {/* <!-- Accordion wrapper --> */}
              </div>
              <div>
                <img src={mern} className="mt-50 img5" />
                {/* <!-- <div className="img" style="background-image: url(mern.png); background-repeat: no-repeat; background-size: contain; height: 450px;width: 100%;">
                  <div className="img-overly" style="height: 100%; width: 100%; background-image: linear-gradient(180deg, #00ffff00 3%, #3c3b3e 90%);"> -->

                  <!-- </div> --> */}
              </div>
              {/* <!-- <div className="img-gred" style="height:2 0%; background: linear-gradient(to right, transparent, mistyrose),url('mern.png'); background-size: contain;"></div> --> */}
              <div className="text-center">
                <h1 className="img10">Join the Community </h1>
                <p className="img10">Who is Leocino</p>
                <a href="https://twitter.com/whoisleocino">
                  <button className="btn-white btn">
                    <i className="fa fa-twitter" aria-hidden="true"></i> Twitter
                  </button>
                </a>
                <a href="https://discord.gg/Jub82XUY9e">
                  <button className="btn btn-pink ml-10">
                    <i className="fa fa-github-alt" aria-hidden="true"></i>{" "}
                    Discord
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-xs-12 col-sm-12"></div>
        </div>

        <div className="footer-black">
          <div className="container p-2">
            <span className="img10">© 2022 Leocino. All Rights Reserved.</span>
            <span className="ml-264">
              {" "}
              <img className="img14" src={logo} alt="logo" />
            </span>
            <span className="icon-right img11">
              {" "}
              <a href="https://discord.gg/Jub82XUY9e">
                <i className="fa fa-github-alt img11" aria-hidden="true"></i>
              </a>
              <a href="https://twitter.com/whoisleocino">
                <i className="fa fa-twitter img11" aria-hidden="true"></i>
              </a>
              <a href="https://www.instagram.com/whoisleocino/">
                <i className="fa fa-instagram img11" aria-hidden="true"></i>
              </a>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
