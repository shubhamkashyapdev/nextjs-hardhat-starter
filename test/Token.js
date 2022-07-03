const { expect } = require("chai")

describe("Token Contract", function () {
  let Token, hardhatToken, owner, address1, address2, restAddress
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token")
    ;[owner, address1, address2, restAddress] = await ethers.getSigners()
    hardhatToken = await Token.deploy()
  })
  describe("Should assign values in constructor", function () {
    it("Should assign total supply to msg.sender", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address)
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)
    })
  })
  describe("Transaction", function () {
    it("Should transfer token between accounts", async function () {
      await hardhatToken.transfer(address1.address, 5)
      const addres1Balance = await hardhatToken.balanceOf(address1.address)
      expect(addres1Balance).to.equal(5)
    })
    it("Should fail if transfer is called with empty account", async function () {
      await expect(
        hardhatToken.connect(address1).transfer(address2.address, 10)
      ).to.be.revertedWith("Not Enough Balance")
    })
  })
})
