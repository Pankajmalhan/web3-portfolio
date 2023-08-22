// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Projects is ERC721, ERC721Enumerable, ERC721Burnable, Ownable, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string private _baseUri;

    constructor() ERC721("Experience", "EXP") {
        _baseUri = "https://cloudflare-ipfs.com/ipfs/";
    }

    function getAllTokenUris() public view returns (string[] memory) {
        uint256 total = totalSupply();
        string[] memory tokenUris = new string[](total);
        for (uint256 i = 0; i < total; i++) {
           uint256 tokenId = tokenByIndex(i);
           tokenUris[i]= super.tokenURI(tokenId);
        }
        return tokenUris;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    function safeMint(string memory uri) public onlyOwner {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }


    function updateTokenURI(
        uint256 _tokenId,
        string memory _newTokenURI
    ) public onlyOwner {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _setTokenURI(_tokenId, _newTokenURI);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // function burn(uint256 tokenId) public onlyOwner  {
    //     _burn(tokenId);
    // }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        _requireMinted(tokenId);
        string memory tokenuri = super.tokenURI(tokenId);
        return tokenuri;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function balanceOf(
        address owner
    ) public view override(ERC721, IERC721) returns (uint256) {
        return super.balanceOf(owner);
    }

    function ownerOf(
        uint256 tokenId
    ) public view override(ERC721, IERC721) returns (address) {
        return super.ownerOf(tokenId);
    }

    function setBaseUri(string memory baseUri) public onlyOwner {
        _baseUri = baseUri;
    }
}
