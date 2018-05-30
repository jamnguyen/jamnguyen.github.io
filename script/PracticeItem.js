class PracticeItem {
  constructor(header, desc, url) {
    this.isExpanded = false;

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('practice-item');

    this.header = document.createElement('a');
    this.header.innerText = header;
    this.header.classList.add('practice-item-header');

    this.desc = document.createElement('div');
    this.desc.classList.add('practice-item-desc');
    this.desc.innerHTML = `<p>${desc}</p>`;
    
    this.go = document.createElement('a');
    this.go.innerHTML = `Go to site <i class="fas fa-long-arrow-alt-right"></i>`;
    this.go.setAttribute('href', url);
    this.go.setAttribute('target', 'blank');

    this.desc.appendChild(this.go);
    this.wrapper.appendChild(this.header);
    this.wrapper.appendChild(this.desc);

    this.header.addEventListener('mouseup', this.onHeaderTouched.bind(this));
    this.header.addEventListener('touchend', this.onHeaderTouched.bind(this));
  }

  onHeaderTouched = (evt) => {
    if (this.isExpanded) {
      this.shrink();
    } else {
      let expandedOne = practiceItems.find(item => item.isExpanded);
      if (expandedOne) {
        expandedOne.shrink();
      }
      this.expand();
    }

    let expandedItem = document.getElementById('practice-item-expand');
    let expandedHeader = document.getElementById('practice-item-header-expand');
    let expandedDesc = document.getElementById('practice-item-desc-expand');

    if (expandedItem) expandedItem.removeAttribute('id');
    if (expandedHeader) expandedHeader.removeAttribute('id');
    if (expandedDesc) expandedDesc.removeAttribute('id');
  }

  shrink = () => {
    this.wrapper.classList.remove('practice-item-expand');
    this.header.classList.remove('practice-item-header-expand');
    this.desc.classList.remove('practice-item-desc-expand');
  }

  expand = () => {
    this.wrapper.classList.add('practice-item-expand');
    this.header.classList.add('practice-item-header-expand');
    this.desc.classList.add('practice-item-desc-expand');
  }
}

module.exports = PracticeItem;