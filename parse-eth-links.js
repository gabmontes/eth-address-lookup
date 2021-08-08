function linkify(el) {
  const ethAddrRegex = new RegExp("0x[0-9a-fA-F]{40}");
  const ethAddrRegexGlobal = new RegExp(ethAddrRegex, "g");

  el.childNodes.forEach(function (node) {
    if (
      node.nodeType !== Node.TEXT_NODE ||
      node.parentElement.tagName === "A"
    ) {
      return;
    }
    if (!ethAddrRegex.test(node.textContent)) {
      return;
    }
    const htmlText = node.textContent.replace(
      ethAddrRegexGlobal,
      `<a href="https://etherscan.io/address/$&" target="_blank">$&</a>`
    );
    const div = document.createElement("div");
    div.innerHTML = htmlText;
    node.replaceWith(...div.childNodes);
  });
}

console.log("Linkifying all Ethereum addresses...");
document.querySelectorAll("*").forEach(linkify);
