// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Projects is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private _baseUri;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("Experience", "EXP") {
        _baseUri= "https://cloudflare-ipfs.com/ipfs/";
    }

    function getAllTokenUris() public  view returns (string[] memory) {
        uint256 total = _tokenIds.current();
        string[] memory tokenUris = new string[](total);
        for (uint256 i = 0; i < total; i++) {
            tokenUris[i] = _tokenURIs[i];
        }
        return tokenUris;
    }
        
    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    function safeMint(address to, string memory uri)
        public
        onlyOwner
    {
        _tokenIds.increment();
         uint256 tokenId = _tokenIds.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal {
        require(_exists(_tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[_tokenId] = _tokenURI;
    }
    function updateTokenURI(uint256 _tokenId, string memory _newTokenURI) public onlyOwner {
          require(_exists(_tokenId), "ERC721Metadata: URI set of nonexistent token");
        _setTokenURI(_tokenId, _newTokenURI);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        _requireMinted(tokenId);
        string memory baseURI = _baseURI();
        string memory tokenuri = _tokenURIs[tokenId];
        return string(abi.encodePacked(baseURI, tokenuri));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function balanceOf(address owner) 
    public 
    view 
    override(ERC721) returns (uint256) {
        return super.balanceOf(owner);
    }

    function ownerOf( uint256 tokenId) 
    public 
    view 
    override(ERC721) returns (address) {
        return super.ownerOf(tokenId);
    }

    function setBaseUri( string memory baseUri) 
    public 
    onlyOwner {
        _baseUri= baseUri;
    } 
}
