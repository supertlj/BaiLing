// 真实的男主数据
const characterData = {
    suiyan: {
        name: '岁衍',
        tag: '上古九尾狐',
        cv: 'CV: 特邀声优',
        quote: '“待人疏离却唯独对你格外纵容。”',
        desc: '表面是温润魅惑的人间古董店老板，气质慵懒，擅长伪装。他是掌控东方妖界秩序的幕后强者，见证了你家族的兴衰起落，默默守护你千年。',
        bg: 'character_suiyan_wide.png',
        subTags: ['#千年守护', '#温润魅惑', '#妖界族长']
    },
    xielvheng: {
        name: '谢律衡',
        tag: '幽府执律使',
        cv: 'CV: 特邀声优',
        quote: '“为了你，破例一次又何妨。”',
        desc: '幽府执掌者之一，负责度化阳世恶念、管理幽魂。表面清冷禁欲，恪守两界法则，从不破例；实则背负上古秘密，多次为你打破幽府规则。',
        bg: 'character_xielvheng_wide.png',
        subTags: ['#清冷禁欲', '#幽府破例', '#克制与越界']
    },
    yexiao: {
        name: '夜骁',
        tag: '大天狗',
        cv: 'CV: 特邀声优',
        quote: '“看什么看？再看把你抓回妖界。”',
        desc: '平安京妖界的掌权者，战斗力天花板。表面桀骜不驯、狂傲不羁，不屑于与人类、幽府打交道，气场凌厉。初期视你为敌人，却在一次次并肩作战中被你打动。',
        bg: 'character_yexiao_wide.png',
        subTags: ['#傲娇毒舌', '#欢喜冤家', '#战斗力天花板']
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('百灵卷宗原型页面已加载');

    const thumbs = document.querySelectorAll('.char-switcher .thumb');
    const contentContainer = document.querySelector('.content-container');
    
    // UI元素 (角色页)
    const charNameEl = document.getElementById('char-name');
    const charTagEl = document.getElementById('char-tag');
    const charCvEl = document.getElementById('char-cv');
    const charQuoteEl = document.getElementById('char-quote');
    const charDescEl = document.getElementById('char-desc');
    const charSubTagsEl = document.getElementById('char-sub-tags');
    const charBgEl = document.querySelector('#section-characters .section-bg');

    // 1. Loading 动画控制
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // 强制触发第一屏的 stagger 动画（解决首屏不显示问题）
        const activeSection = document.querySelector('.page-section.active');
        if (activeSection) {
            const staggerItems = activeSection.querySelectorAll('.stagger-item');
            staggerItems.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // 强制回流
                el.style.animation = '';
            });
        }
    }, 2500);

    // 2. 动态粒子生成 (为每个板块生成)
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        const particleCount = 10;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            sec.appendChild(particle);
        }
    });

    // 3. 角色切换逻辑
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const charKey = thumb.getAttribute('data-char');
            const data = characterData[charKey];

            if (!data) return;

            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            charBgEl.style.opacity = '0.3';
            
            setTimeout(() => {
                charNameEl.textContent = data.name;
                charTagEl.textContent = data.tag;
                charCvEl.textContent = data.cv;
                charQuoteEl.textContent = data.quote;
                charDescEl.innerHTML = `<p>${data.desc}</p>`;
                
                charSubTagsEl.innerHTML = '';
                data.subTags.forEach(tag => {
                    const span = document.createElement('span');
                    span.textContent = tag;
                    charSubTagsEl.appendChild(span);
                });

                charBgEl.style.backgroundImage = `url('${data.bg}')`;
                charBgEl.style.opacity = '1';
            }, 300);
        });
    });

    // 4. 滑动光标指示器逻辑
    const navIndicator = document.querySelector('.nav-indicator');
    const navItems = document.querySelectorAll('.nav-item');

    function updateIndicator(activeItem) {
        const rect = activeItem.getBoundingClientRect();
        const parentRect = activeItem.parentElement.parentElement.getBoundingClientRect();
        
        const left = rect.left - parentRect.left;
        const width = rect.width;

        navIndicator.style.left = `${left}px`;
        navIndicator.style.width = `${width}px`;
    }

    const defaultActive = document.querySelector('.nav-item.active');
    if (defaultActive) {
        setTimeout(() => {
            updateIndicator(defaultActive);
        }, 100);
    }

    // 5. 导航栏版块切换逻辑
    navItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSectionId = `section-${item.getAttribute('data-section')}`;

            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            updateIndicator(item);

            contentContainer.style.transform = `translateY(-${index * 100}vh)`;

            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === targetSectionId) {
                    // 重置 stagger 动画，确保每次切换都能重新播放
                    const staggerItems = sec.querySelectorAll('.stagger-item');
                    staggerItems.forEach(el => {
                        el.style.animation = 'none';
                        el.offsetHeight; // 强制回流，让浏览器重置动画状态
                        el.style.animation = '';
                    });
                    sec.classList.add('active');
                }
            });
        });
    });

    // 首页按钮联动
    document.getElementById('go-to-story').addEventListener('click', () => {
        document.querySelector('[data-section="story"]').click();
    });

    // 【修改】故事页“返回”按钮改为“结识男主”，点击滚到下一屏（角色介绍）
    document.getElementById('back-to-home').addEventListener('click', () => {
        document.querySelector('[data-section="characters"]').click();
    });

    // 模拟倾听心声按钮
    document.getElementById('voice-btn').addEventListener('click', () => {
        const activeThumb = document.querySelector('.char-switcher .thumb.active');
        const charKey = activeThumb.getAttribute('data-char');
        const data = characterData[charKey];
        alert(`正在播放【${data.name}】的心声语音片段...`);
    });

    // 模拟玩法卡片点击
    const featureCards = document.querySelectorAll('.feature-card-new');
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            featureCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // 6. 视听中心：点击剧照切换该板块的大背景预览
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryBgEl = document.querySelector('#section-gallery .section-bg');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetBg = item.getAttribute('data-bg');
            galleryBgEl.style.opacity = '0.3';
            setTimeout(() => {
                galleryBgEl.style.backgroundImage = `url('${targetBg}')`;
                galleryBgEl.style.opacity = '1';
            }, 300);
        });
    });

    // 5. 视差动效
    document.addEventListener('mousemove', (e) => {
        const activeSection = document.querySelector('.page-section.active');
        if (!activeSection) return;
        
        const activeBg = activeSection.querySelector('.section-bg');
        if (!activeBg) return;

        const moveX = (e.clientX - window.innerWidth / 2) / 70;
        const moveY = (e.clientY - window.innerHeight / 2) / 70;
        activeBg.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
    });

    // 7. 移动端菜单开关逻辑
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItemsArray = document.querySelectorAll('.nav-item');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // 点击菜单项后自动关闭菜单
    navItemsArray.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                mobileMenuBtn.classList.remove('open');
                navLinks.classList.remove('open');
            }
        });
    });

    // 8. 手机端触摸滑动切屏 (Swipe)
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50; // 触发滑动的最小距离

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const deltaY = touchEndY - touchStartY;
        // 获取当前激活的导航项索引
        const currentActiveItem = document.querySelector('.nav-item.active');
        if (!currentActiveItem) return;
        
        // 将 NodeList 转为数组以获取索引
        const itemsArray = Array.from(navItems);
        const currentIndex = itemsArray.indexOf(currentActiveItem);

        if (Math.abs(deltaY) > swipeThreshold) {
            if (deltaY < 0) {
                // 向上滑（手指往上拉），看下一页
                if (currentIndex < itemsArray.length - 1) {
                    itemsArray[currentIndex + 1].click();
                }
            } else {
                // 向下滑（手指往下拉），看上一页
                if (currentIndex > 0) {
                    itemsArray[currentIndex - 1].click();
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-item.active');
        if (currentActive) {
            updateIndicator(currentActive);
        }
    });
});
