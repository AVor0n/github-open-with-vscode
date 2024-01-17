function openLocalVSCode() {
    window.location.href = `vscode://vscode.git/clone?url=${location.href}`;
}

function openBrowserVSCode() {
    window.location.href = `https://vscode.dev/${location.href}`;
}

function isMainPageOfRepo() {
    return !!document
        ?.querySelector("[data-pjax='#repo-content-pjax-container']")
        ?.classList.contains('selected');
}

function getCodeButton() {
    const allButtons = Array.from(
        document.querySelectorAll('[data-selector="repos-split-pane-content"] button'),
    );
    return allButtons.find(button => button.textContent === 'Code');
}

function getCodePopupMenu() {
    return document.querySelector('#__primerPortalRoot__');
}

function getOpenWithVisualStudioButton() {
    const popupMenu = getCodePopupMenu();
    if (!popupMenu) return null;

    const options = Array.from(popupMenu.querySelectorAll('li'));
    return options.find(option => option.textContent === 'Open with Visual Studio');
}

function updateCodePopupMenu() {
    const openWithVS = getOpenWithVisualStudioButton();
    if (!openWithVS) return;

    const openWithVSCode = openWithVS.cloneNode(true) as HTMLElement;
    openWithVSCode.textContent = 'Open with Visual Studio Code';
    openWithVSCode.addEventListener('click', openLocalVSCode);

    const openWithVSCodeDev = openWithVS.cloneNode(true) as HTMLElement;
    openWithVSCodeDev.textContent = 'Open with vscode.dev';
    openWithVSCodeDev.addEventListener('click', openBrowserVSCode);

    openWithVS.insertAdjacentElement('afterend', openWithVSCodeDev);
    openWithVS.insertAdjacentElement('afterend', openWithVSCode);
    openWithVS.remove();
}

function main() {
    if (isMainPageOfRepo()) {
        getCodeButton()?.addEventListener('click', () => {
            setTimeout(updateCodePopupMenu, 0);
        });
    }
}

main();
