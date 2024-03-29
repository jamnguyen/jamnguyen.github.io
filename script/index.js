class PracticeItem {
  constructor(header, desc, url) {
    this.isExpanded = false;

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('practice-item');

    this.headerWrapper = document.createElement('div');
    this.headerWrapper.classList.add('practice-item-header-wrapper');
    this.header = document.createElement('a');
    this.header.innerText = '# ' + header;
    this.header.classList.add('practice-item-header');

    this.desc = document.createElement('div');
    this.desc.classList.add('practice-item-desc');
    this.desc.innerHTML = `<p>${desc}</p>`;
    
    this.go = document.createElement('a');
    this.go.innerHTML = `Go to site <i class="fas fa-long-arrow-alt-right"></i>`;
    this.go.setAttribute('href', url);
    // this.go.setAttribute('target', '_blank');

    this.desc.appendChild(this.go);
    this.headerWrapper.appendChild(this.header);
    this.wrapper.appendChild(this.headerWrapper);
    this.wrapper.appendChild(this.desc);

    this.header.addEventListener('mouseup', this.onHeaderTouched.bind(this));
    // this.header.addEventListener('touchend', this.onHeaderTouched.bind(this));
  }

  onHeaderTouched(evt) {
    if (this.isExpanded) {
      this.shrink();
    } else {
      let expandedOne = practiceItems.find(item => item.isExpanded);
      if (expandedOne) {
        expandedOne.shrink();
      }
      this.expand();
    }
  }

  shrink() {
    this.wrapper.classList.remove('practice-item-expand');
    this.headerWrapper.classList.remove('practice-item-header-wrapper-expand');
    this.header.classList.remove('practice-item-header-expand');
    this.desc.classList.remove('practice-item-desc-expand');
    this.isExpanded = false;
  }

  expand() {
    this.wrapper.classList.add('practice-item-expand');
    this.headerWrapper.classList.add('practice-item-header-wrapper-expand');
    this.header.classList.add('practice-item-header-expand');
    this.desc.classList.add('practice-item-desc-expand');
    this.isExpanded = true;
  }
}

var practiceItemData = [
  // {
  //   header: 'Parallax Sliding',
  //   desc: 'Using pure Javascript, CSS and HTML to create parallax effect while sliding.',
  //   url: './parallax_sliding/'
  // },
  {
    header: 'Hoan chan Menu',
    desc: 'Simple menu for my friend. Mam mam.',
    url: './hoan-chan-menu/'
  },
  {
    header: 'Team Shuffler',
    desc: 'A simple tool for quick team picking (in my football team).',
    url: './team-shuffler/'
  },
  {
    header: 'Jakict',
    desc: 'Are you learning languages? This is an simple application made with ReactJS to build your own dictionary.',
    url: 'https://jakict.jamnguyen.com/'
  },
  {
    header: 'Jam CV',
    desc: 'A simple app to create CV. Made by ReactJS and Firebase.',
    url: './jamcv/'
  },
  {
    header: 'Aircraft',
    desc: 'A simple board game using plain JS and Socket IO.',
    url: './aircraft'
  },
  {
    header: 'React Tutorial',
    desc: 'Followed the tutorial on the official ReactJS site, including extended tasks.',
    url: './react-tutorial/'
  },
  {
    header: 'Contact Manager',
    desc: 'Simple React app to manage Contacts.',
    url: './contact-manager/'
  },
  {
    header: 'Bounce',
    desc: 'Play with Canvas.',
    url: './bounce/'
  },
  // {
  //   header: 'Aki',
  //   desc: 'Simple Fibonacci calculator.',
  //   url: './fibonacci/'
  // },
]

var practiceItems = [];

main = () => {
  let myPracticeDiv = document.getElementById('my-practice');
  for(let i=0; i<practiceItemData.length; i++) {
    practiceItems.push(
      new PracticeItem(
        practiceItemData[i].header,
        practiceItemData[i].desc,
        practiceItemData[i].url
      )
    );
    myPracticeDiv.appendChild(
      practiceItems[i].wrapper
    );
  }
}

main();