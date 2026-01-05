// Interactive animations and effects for contents page

// Scene data
const scenesData = [
  {"id": "001", "category": "日常会話", "level": "★☆☆☆", "location": "機内", "title": "機内食を頼む", "image": "scene-image.png"},
  {"id": "002", "category": "日常会話", "level": "★☆☆☆", "location": "空港①", "title": "入国審査を受ける", "image": "scene-image.png"},
  {"id": "003", "category": "日常会話", "level": "★★☆☆", "location": "空港②", "title": "ロストバゲージを伝える", "image": "scene-image.png"},
  {"id": "004", "category": "日常会話", "level": "★☆☆☆", "location": "空港③", "title": "両替をする", "image": "scene-image.png"},
  {"id": "005", "category": "日常会話", "level": "★☆☆☆", "location": "移動①", "title": "市内への行き方を尋ねる", "image": "scene-image.png"},
  {"id": "006", "category": "日常会話", "level": "★☆☆☆", "location": "移動②", "title": "目的地への道順を尋ねる", "image": "scene-image.png"},
  {"id": "007", "category": "日常会話", "level": "★☆☆☆", "location": "移動③", "title": "交通系ICカードを入手する", "image": "scene-image.png"},
  {"id": "008", "category": "日常会話", "level": "★★☆☆", "location": "移動④", "title": "乗るべき電車を尋ねる", "image": "scene-image.png"},
  {"id": "009", "category": "日常会話", "level": "★★☆☆", "location": "移動⑤", "title": "電車の遅延状況を尋ねる", "image": "scene-image.png"},
  {"id": "010", "category": "日常会話", "level": "★★☆☆", "location": "移動⑥", "title": "SIMカードを入手する", "image": "scene-image.png"},
  {"id": "011", "category": "日常会話", "level": "★☆☆☆", "location": "ホテル①", "title": "チェックインをする", "image": "scene-image.png"},
  {"id": "012", "category": "日常会話", "level": "★★☆☆", "location": "ホテル②", "title": "設備が故障したことを伝える", "image": "scene-image.png"},
  {"id": "013", "category": "日常会話", "level": "★★☆☆", "location": "ホテル③", "title": "タクシーの手配をお願いする", "image": "scene-image.png"},
  {"id": "014", "category": "日常会話", "level": "★☆☆☆", "location": "ホテル④", "title": "チェックアウトをする", "image": "scene-image.png"},
  {"id": "015", "category": "日常会話", "level": "★☆☆☆", "location": "民泊①", "title": "鍵を受け取る", "image": "scene-image.png"},
  {"id": "016", "category": "日常会話", "level": "★★☆☆", "location": "民泊②", "title": "他のゲストとの交流", "image": "scene-image.png"},
  {"id": "017", "category": "日常会話", "level": "★☆☆☆", "location": "語学学校①", "title": "自己紹介をする", "image": "scene-image.png"},
  {"id": "018", "category": "日常会話", "level": "★★☆☆", "location": "語学学校②", "title": "友人に質問をする", "image": "scene-image.png"},
  {"id": "019", "category": "日常会話", "level": "★★☆☆", "location": "語学学校③", "title": "パーティーに誘われた", "image": "scene-image.png"},
  {"id": "020", "category": "日常会話", "level": "★★☆☆", "location": "お出かけ①", "title": "週末、映画に誘う", "image": "scene-image.png"},
  {"id": "021", "category": "日常会話", "level": "★☆☆☆", "location": "お出かけ②", "title": "ファストフード店で注文する", "image": "scene-image.png"},
  {"id": "022", "category": "日常会話", "level": "★☆☆☆", "location": "お出かけ③", "title": "チケットを購入する", "image": "scene-image.png"},
  {"id": "023", "category": "日常会話", "level": "★★☆☆", "location": "お出かけ④", "title": "レンタカーを借りる", "image": "scene-image.png"},
  {"id": "024", "category": "日常会話", "level": "★☆☆☆", "location": "買い物①", "title": "商品の場所を尋ねる", "image": "scene-image.png"},
  {"id": "025", "category": "日常会話", "level": "★★☆☆", "location": "買い物②", "title": "商品の違いを尋ねる", "image": "scene-image.png"},
  {"id": "026", "category": "日常会話", "level": "★★☆☆", "location": "買い物③", "title": "値下げをお願いする", "image": "scene-image.png"},
  {"id": "027", "category": "日常会話", "level": "★★☆☆", "location": "買い物④", "title": "服の試着をする", "image": "scene-image.png"},
  {"id": "028", "category": "日常会話", "level": "★★☆☆", "location": "買い物⑤", "title": "商品の返品を申し出る", "image": "scene-image.png"},
  {"id": "029", "category": "日常会話", "level": "★★☆☆", "location": "体調不良①", "title": "病院で症状を説明する", "image": "scene-image.png"},
  {"id": "030", "category": "日常会話", "level": "★★☆☆", "location": "体調不良②", "title": "薬局で薬を処方してもらう", "image": "scene-image.png"},
  {"id": "031", "category": "インバウンド", "level": "★★☆☆", "location": "道案内①", "title": "スマホで調べて案内する", "image": "scene-image.png"},
  {"id": "032", "category": "インバウンド", "level": "★★☆☆", "location": "道案内②", "title": "お寺の境内の案内をする", "image": "scene-image.png"},
  {"id": "033", "category": "インバウンド", "level": "★★☆☆", "location": "道案内③", "title": "参拝方法を説明する", "image": "scene-image.png"},
  {"id": "034", "category": "インバウンド", "level": "★★☆☆", "location": "接客一般", "title": "レジの対応をする", "image": "scene-image.png"},
  {"id": "035", "category": "インバウンド", "level": "★★☆☆", "location": "衣料品店", "title": "商品の説明をする", "image": "scene-image.png"},
  {"id": "036", "category": "インバウンド", "level": "★★★☆", "location": "土産物店①", "title": "おすすめの商品の説明をする", "image": "scene-image.png"},
  {"id": "037", "category": "インバウンド", "level": "★★★☆", "location": "土産物店②", "title": "試食・購入を勧める", "image": "scene-image.png"},
  {"id": "038", "category": "インバウンド", "level": "★★☆☆", "location": "土産物店③", "title": "レジの対応をする", "image": "scene-image.png"},
  {"id": "039", "category": "インバウンド", "level": "★★☆☆", "location": "家電量販店①", "title": "お探しの商品を案内する", "image": "scene-image.png"},
  {"id": "040", "category": "インバウンド", "level": "★★☆☆", "location": "家電量販店②", "title": "値下げ交渉に対応する", "image": "scene-image.png"},
  {"id": "041", "category": "インバウンド", "level": "★★☆☆", "location": "レストラン", "title": "来店したお客を案内する", "image": "scene-image.png"},
  {"id": "042", "category": "インバウンド", "level": "★★☆☆", "location": "コーヒーショップ①", "title": "注文を受ける", "image": "scene-image.png"},
  {"id": "043", "category": "インバウンド", "level": "★★☆☆", "location": "コーヒーショップ②", "title": "オーダーミスの対応をする", "image": "scene-image.png"},
  {"id": "044", "category": "インバウンド", "level": "★★☆☆", "location": "ホテル①", "title": "予約の対応をする", "image": "scene-image.png"},
  {"id": "045", "category": "インバウンド", "level": "★★☆☆", "location": "ホテル②", "title": "浴場の案内をする", "image": "scene-image.png"},
  {"id": "046", "category": "インバウンド", "level": "★★☆☆", "location": "ホテル③", "title": "フロントの対応をする", "image": "scene-image.png"},
  {"id": "047", "category": "インバウンド", "level": "★★★☆", "location": "日本紹介①", "title": "おすすめの日本食を紹介する", "image": "scene-image.png"},
  {"id": "048", "category": "インバウンド", "level": "★★★☆", "location": "日本紹介②", "title": "日本のマナーを紹介する", "image": "scene-image.png"},
  {"id": "049", "category": "インバウンド", "level": "★★★☆", "location": "日本紹介③", "title": "日本の学校生活を紹介する", "image": "scene-image.png"},
  {"id": "050", "category": "インバウンド", "level": "★★★☆", "location": "日本紹介④", "title": "日本の面白いところを紹介する", "image": "scene-image.png"},
  {"id": "051", "category": "ビジネス", "level": "★★★☆", "location": "面接①", "title": "自分の経歴について話す", "image": "scene-image.png"},
  {"id": "052", "category": "ビジネス", "level": "★★★☆", "location": "面接②", "title": "志望動機について話す", "image": "scene-image.png"},
  {"id": "053", "category": "ビジネス", "level": "★★★☆", "location": "面接③", "title": "自分の強みについて話す", "image": "scene-image.png"},
  {"id": "054", "category": "ビジネス", "level": "★★★☆", "location": "面接④", "title": "自分の弱みについて話す", "image": "scene-image.png"},
  {"id": "055", "category": "ビジネス", "level": "★★☆☆", "location": "面接⑤", "title": "面接官に質問する", "image": "scene-image.png"},
  {"id": "056", "category": "ビジネス", "level": "★★★☆", "location": "オフィス①", "title": "出勤時のあいさつ", "image": "scene-image.png"},
  {"id": "057", "category": "ビジネス", "level": "★★☆☆", "location": "オフィス②", "title": "同僚の紹介をする", "image": "scene-image.png"},
  {"id": "058", "category": "ビジネス", "level": "★★☆☆", "location": "オフィス③", "title": "同僚を食事に誘う", "image": "scene-image.png"},
  {"id": "059", "category": "ビジネス", "level": "★★☆☆", "location": "オフィス④", "title": "仕事を依頼する", "image": "scene-image.png"},
  {"id": "060", "category": "ビジネス", "level": "★★★☆", "location": "オフィス⑤", "title": "仕事の指示を受ける", "image": "scene-image.png"},
  {"id": "061", "category": "ビジネス", "level": "★★★☆", "location": "オフィス⑥", "title": "上司に進捗の報告をする", "image": "scene-image.png"},
  {"id": "062", "category": "ビジネス", "level": "★★☆☆", "location": "オフィス⑦", "title": "事務機器の使い方を尋ねる", "image": "scene-image.png"},
  {"id": "063", "category": "ビジネス", "level": "★★☆☆", "location": "オフィス⑧", "title": "退勤時のあいさつ", "image": "scene-image.png"},
  {"id": "064", "category": "ビジネス", "level": "★★★☆", "location": "社外との取引①", "title": "アポイントを取る", "image": "scene-image.png"},
  {"id": "065", "category": "ビジネス", "level": "★★☆☆", "location": "社外との取引②", "title": "取引先の受付", "image": "scene-image.png"},
  {"id": "066", "category": "ビジネス", "level": "★★★☆", "location": "社外との取引③", "title": "自社の製品を売り込む", "image": "scene-image.png"},
  {"id": "067", "category": "ビジネス", "level": "★★☆☆", "location": "社外との取引④", "title": "書類の誤りを尋ねる", "image": "scene-image.png"},
  {"id": "068", "category": "ビジネス", "level": "★★☆☆", "location": "会議①", "title": "会議を始める", "image": "scene-image.png"},
  {"id": "069", "category": "ビジネス", "level": "★★☆☆", "location": "会議②", "title": "売上報告をする", "image": "scene-image.png"},
  {"id": "070", "category": "ビジネス", "level": "★★★☆", "location": "会議③", "title": "質問に答える", "image": "scene-image.png"},
  {"id": "071", "category": "ビジネス", "level": "★★★☆", "location": "会議④", "title": "質問をする", "image": "scene-image.png"},
  {"id": "072", "category": "ビジネス", "level": "★★★☆", "location": "会議⑤", "title": "賛成／反対意見を言う", "image": "scene-image.png"},
  {"id": "073", "category": "ビジネス", "level": "★★★☆", "location": "会議⑥", "title": "提案をする", "image": "scene-image.png"},
  {"id": "074", "category": "ビジネス", "level": "★★☆☆", "location": "会議⑦", "title": "会議を終了する", "image": "scene-image.png"},
  {"id": "075", "category": "ビジネス", "level": "★☆☆☆", "location": "Web会議", "title": "音声チェック・画面を共有する", "image": "scene-image.png"},
  {"id": "076", "category": "ビジネス", "level": "★★☆☆", "location": "電話①", "title": "電話をかける", "image": "scene-image.png"},
  {"id": "077", "category": "ビジネス", "level": "★★☆☆", "location": "電話②", "title": "電話を受ける", "image": "scene-image.png"},
  {"id": "078", "category": "ビジネス", "level": "★★★☆", "location": "プレゼンテーション①", "title": "導入をする", "image": "scene-image.png"},
  {"id": "079", "category": "ビジネス", "level": "★★★☆", "location": "プレゼンテーション②", "title": "本題〜データの説明〜", "image": "scene-image.png"},
  {"id": "080", "category": "ビジネス", "level": "★★★☆", "location": "プレゼンテーション③", "title": "本題〜製品の紹介〜", "image": "scene-image.png"},
  {"id": "081", "category": "ビジネス", "level": "★★★☆", "location": "プレゼンテーション④", "title": "結論を述べる", "image": "scene-image.png"},
  {"id": "082", "category": "ビジネス", "level": "★★☆☆", "location": "ネットワーキング", "title": "交流会での自己紹介", "image": "scene-image.png"},
  {"id": "083", "category": "雑談・発展", "level": "★☆☆☆", "location": "雑談①", "title": "SNSのアカウントを交換する", "image": "scene-image.png"},
  {"id": "084", "category": "雑談・発展", "level": "★★☆☆", "location": "雑談②", "title": "天気について話す", "image": "scene-image.png"},
  {"id": "085", "category": "雑談・発展", "level": "★★☆☆", "location": "雑談③", "title": "出身地について話す", "image": "scene-image.png"},
  {"id": "086", "category": "雑談・発展", "level": "★★★☆", "location": "雑談④", "title": "好きな映画について話す", "image": "scene-image.png"},
  {"id": "087", "category": "雑談・発展", "level": "★★★☆", "location": "雑談⑤", "title": "旅行について話す", "image": "scene-image.png"},
  {"id": "088", "category": "雑談・発展", "level": "★★★☆", "location": "雑談⑥", "title": "推しについて語る", "image": "scene-image.png"},
  {"id": "089", "category": "雑談・発展", "level": "★★★☆", "location": "雑談⑦", "title": "家族のことについて話す", "image": "scene-image.png"},
  {"id": "090", "category": "雑談・発展", "level": "★★★☆", "location": "雑談⑧", "title": "運動習慣について話す", "image": "scene-image.png"},
  {"id": "091", "category": "雑談・発展", "level": "★★★☆", "location": "雑談⑨", "title": "友人の相談に乗る", "image": "scene-image.png"},
  {"id": "092", "category": "雑談・発展", "level": "★★★★", "location": "発展①", "title": "ニュースを読んで要約する", "image": "scene-image.png"},
  {"id": "093", "category": "雑談・発展", "level": "★★★★", "location": "発展②", "title": "ニュースを読んで質問に答える", "image": "scene-image.png"},
  {"id": "094", "category": "雑談・発展", "level": "★★★★", "location": "発展③", "title": "ニュースを視聴して質問に答える", "image": "scene-image.png"},
  {"id": "095", "category": "雑談・発展", "level": "★★★★", "location": "発展④", "title": "ニュースを視聴して議論する", "image": "scene-image.png"},
  {"id": "096", "category": "雑談・発展", "level": "★★★★", "location": "発展⑤", "title": "4コマ漫画のストーリーを説明する", "image": "scene-image.png"},
  {"id": "097", "category": "雑談・発展", "level": "★★★★", "location": "発展⑥", "title": "4コマ漫画を題材にAIと議論する", "image": "scene-image.png"},
  {"id": "098", "category": "雑談・発展", "level": "★★★★", "location": "発展⑦", "title": "特定のトピックについてディベートする", "image": "scene-image.png"},
  {"id": "099", "category": "雑談・発展", "level": "★★★★", "location": "発展⑧", "title": "特定のトピックについてスピーチする", "image": "scene-image.png"},
  {"id": "100", "category": "雑談・発展", "level": "★★★★", "location": "発展⑨", "title": "会話を聞いて意見や質問を挟む", "image": "scene-image.png"}
];

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Generate scene cards dynamically
    const contentsList = document.getElementById('contentsList');
    scenesData.forEach((scene) => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.setAttribute('data-name', `SCENE ${scene.id}`);

        card.innerHTML = `
            <div class="scene-image" data-name="image">
                <img src="assets/images/${scene.image}" alt="SCENE ${scene.id}">
            </div>
            <div class="scene-data" data-name="SCENE Data">
                <div class="metadata" data-name="metadata">
                    <span class="category-tag" data-name="Category">${scene.category}</span>
                    <span class="level-tag" data-name="Level">${scene.level}</span>
                </div>
                <div class="scene-number">SCENE ${scene.id}</div>
                <div class="scene-location">${scene.location}</div>
                <div class="scene-title">${scene.title}</div>
            </div>
        `;

        contentsList.appendChild(card);
    });

    // Filter button functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Here you can add filtering logic
            filterScenes();
        });
    });

    // Filter scenes based on active filters
    function filterScenes() {
        const sceneCards = document.querySelectorAll('.scene-card');

        // Get active category filters (ジャンル)
        const activeCategories = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.textContent.trim())
            .filter(text => !text.includes('★')); // Exclude star ratings

        // Get active level filters (レベル)
        const activeLevels = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.textContent.trim())
            .filter(text => text.includes('★')); // Only star ratings

        sceneCards.forEach(card => {
            const categoryTag = card.querySelector('.category-tag')?.textContent.trim();
            const levelTag = card.querySelector('.level-tag')?.textContent.trim();

            // Check if card matches filters (AND condition)
            let showCard = true;

            // If category filters are active, card must match one of them
            if (activeCategories.length > 0) {
                showCard = activeCategories.includes(categoryTag);
            }

            // If level filters are active, card must match one of them (AND with category)
            if (activeLevels.length > 0 && showCard) {
                showCard = activeLevels.includes(levelTag);
            }

            card.style.display = showCard ? 'flex' : 'none';
        });
    }

    // Scene card interactions
    const sceneCards = document.querySelectorAll('.scene-card');

    sceneCards.forEach(card => {
        // Add hover animation enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });

        // Add click handler
        card.addEventListener('click', function(e) {
            const sceneNumber = this.querySelector('.scene-number')?.textContent;
            console.log(`Clicked on ${sceneNumber}`);

            // Add energetic click animation with bounce
            this.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.6, 1)';
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '1px 1px 0px 0px black';

            // Create light ripple effect (like home button)
            const light = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height);

            light.style.position = 'absolute';
            light.style.left = x + 'px';
            light.style.top = y + 'px';
            light.style.width = size + 'px';
            light.style.height = size + 'px';
            light.style.borderRadius = '50%';
            light.style.backgroundColor = 'rgba(127, 255, 0, 0.4)';
            light.style.pointerEvents = 'none';
            light.style.transform = 'translate(-50%, -50%) scale(0)';
            light.style.animation = 'light-ripple 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(light);

            setTimeout(() => light.remove(), 600);

            // Bounce back with overshoot
            setTimeout(() => {
                this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '4px 4px 0px 0px black';
            }, 150);

            // Settle to normal
            setTimeout(() => {
                this.style.transition = 'all 0.3s ease';
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.overflow = 'visible';
            }, 400);

            // Example navigation - replace with actual page
            // window.location.href = `scene.html?id=${sceneNumber}`;
        });
    });

    // Menu overlay functionality
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeButton = document.getElementById('closeButton');

    // Open menu overlay
    menuButton.addEventListener('click', function() {
        console.log('Menu button clicked');

        // Add rotation animation
        this.style.transform = 'rotate(90deg) scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);

        // Show menu overlay
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close menu overlay
    closeButton.addEventListener('click', function() {
        console.log('Close button clicked');

        // Hide menu overlay
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close overlay when clicking outside the menu content
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Trigger animation for all cards on page load
    sceneCards.forEach((card, index) => {
        card.classList.add('animate-in');
    });

    // Add subtle parallax effect on scroll
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');

                if (header) {
                    header.style.transform = `translateY(${scrolled * 0.1}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes light-ripple {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
