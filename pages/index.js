import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

// contract
import Greeter from "../src/artifacts/contracts/Greeter.sol/Greeter.json"
const GREETER_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

const Home = () => {
  const [message, setMessage] = useState("")
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)

  // helper functions
  async function requestAccounts() {
    const accounst = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
  }

  // fetch greetings
  async function fetchGreeting() {
    if (!provider) {
      console.log("Please Install Metamask")
    }
    if (typeof window.ethereum !== "undefined") {
      try {
        const data = await contract.greet()
        console.log({ data })
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function setGreeting() {
    if (!provider) {
      console.log("Please Install Metamask")
    }
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts()
      const signer = provider.getSigner()
      const contract = new ethers.Contract(GREETER_ADDRESS, Greeter.abi, signer)
      const transaction = await contract.setGreeting(message)
      setMessage("")
      await transaction.wait()
      fetchGreeting()
    }
  }

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (provider) {
      setProvider(provider)
      const contract = new ethers.Contract(
        GREETER_ADDRESS,
        Greeter.abi,
        provider
      )
      setContract(contract)
    } else {
      console.log("Please Install Metamask")
    }
  }, [])

  return (
    <div className="my-[60px] flex justify-center items-center flex-col gap-y-8">
      <div className="flex w-[30%] justify-between gap-x-8 border-b-2 pb-4">
        <button
          onClick={fetchGreeting}
          className="bg-indigo-700 text-white font-bold border-2 border-indigo-700 rounded-md shadow-md py-2 px-6"
        >
          Fetch Greetings
        </button>
        <button
          onClick={setGreeting}
          className="bg-orange-700 text-white font-bold border-2 border-orange-700 rounded-md shadow-md py-2 px-6"
        >
          Set Greetings
        </button>
      </div>
      <div className="flex w-[30%] flex-col gap-y-4">
        <label className="cursor-pointer underline text-xl" htmlFor="message">
          Add Your Greeting Here!
        </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Add Greeting Message"
          className="border-b-2 border-gray-500 focus:border-black outline-none shadow-md p-2"
        />
      </div>
    </div>
  )
}

export default Home
