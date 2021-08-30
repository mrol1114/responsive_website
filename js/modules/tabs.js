function tabsHandler({ tab, container, content, activeClass }) {
    const tabs = document.querySelectorAll(tab);
    const tabParent = document.querySelector(container);
    const tabContent = document.querySelectorAll(content);

    function disableTabs() {

        tabContent.forEach(function (item) {
            item.classList.add('hide');
            item.classList.remove('display');
        });

        tabs.forEach(function (item) {
            item.classList.remove(activeClass);
        });
    }

    function activeTab(i = 0) {

        tabContent[i].classList.add('display');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    disableTabs();
    activeTab();

    tabParent.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains(tab.slice(1))) {

            disableTabs();
            tabs.forEach(function (item, i) {
                if (item === target) {
                    activeTab(i);
                }
            });
        }
    });
}

export default tabsHandler;