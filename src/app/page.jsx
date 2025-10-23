"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle, style, showLine = true }) => (
  <div className="relative mb-4 md:mb-6">
    {showLine && <div className="w-1/2 h-1 mx-auto mb-4" style={{ backgroundColor: '#d2b48c' }}></div>}
    <h2 className="text-2xl md:text-3xl font-medium text-center text-black whitespace-pre-line" style={style}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-lg lg:text-xl text-gray-600 text-center" style={style}>
        {subtitle}
      </p>
    )}
  </div>
);

// もしくは別のデザインバージョン
const SectionHeader2 = ({ title, subtitle }) => (
  <div className="relative mb-12 md:mb-16 px-4">
    <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-bold text-center w-full">
      <span className="relative z-10">{title}</span>
      <span className="absolute left-0 bottom-1 w-full h-3 bg-rose-200/30 -rotate-1 z-0"></span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// カラーパレットの定義
const colors = {
  primary: {
    bg: 'bg-[#f8f6f4]',      // ベースの明るいベージュ
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#d4c3b7]',  // ライトブラウン
  },
  secondary: {
    light: 'bg-[#fdfbf9]',   // オフホワイト
    border: 'border-[#e8e2dc]', // ライトベージュ
    hover: 'hover:bg-[#f3efe9]', // ホバー時のベージュ
  }
};

// Instagramの埋め込みを最適化
const InstagramEmbed = ({ url }) => {
  return (
    <div className="w-full aspect-[9/16] max-w-[280px] mx-auto">
      <iframe 
        src={url}
        className="w-full h-full"
        frameBorder="0" 
        scrolling="no" 
        allowtransparency="true"
      />
    </div>
  );
};

// スタッフカードコンポーネントを修正して動画対応を追加
const StaffCard = ({ image, name, position, message, instagramUrl, videoUrl }) => {
  return (
    <div className="flex flex-col items-center py-8">
  {/* 画像：大きく、太めの#FF998Aボーダー */}

  <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[6px] border-[#f8f6f4] overflow-hidden flex items-center justify-center mb-6">
    <Image
      src={image}
      alt={`スタッフ${name}`}
      width={280}
      height={280}
      className="w-full h-full object-cover object-top rounded-full"
    />
  </div>
  {/* 名前 */}
  <div className="text-center">
    <p className="text-[#FF998A] text-2xl md:text-3xl font-bold mb-1 tracking-wide">{name}</p>
    <p className="text-gray-500 text-base md:text-lg mb-4">{position}</p>
    {/* アンダーライン */}
    <div className="w-16 h-1 bg-[#f8f6f4] mx-auto mb-6 rounded-full"></div>

    {/* メッセージ（あれば） */}
    {message && (
      <p className="text-gray-700 mb-6">{message}</p>
    )}
    {/* 動画 or Instagram */}
    {videoUrl && (
      <div className="w-full max-w-[500px] mx-auto rounded-xl overflow-hidden mt-4">
        <video 
          src={videoUrl} 
          controls 
          className="w-full h-full"
          preload="metadata"
          poster="/image/sarasamune.png"
        />
      </div>
    )}
    {instagramUrl && !videoUrl && (
      <InstagramEmbed url={instagramUrl} />
    )}
  </div>
</div>
  );
};

// スライドショーコンポーネントを追加
const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/image/gaikan.jpg",
      alt: "外観の様子"
    },
    {
      src: "/image/naisou.jpg",
      alt: "店内の様子"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[1/1] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[1/1] overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ${
            currentImageIndex === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 768px) 80vw,
                   (max-width: 1024px) 70vw,
                   60vw"
            className="object-cover object-center"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
      
      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

function MainComponent() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  // 追従CTA表示制御用state
  const [showFixedCTA, setShowFixedCTA] = useState(false);

  // 各セクションのIntersectionObserverを設定
  const [conceptRef, conceptInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [staffRef, staffInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [requirementsRef, requirementsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [qaRef, qaInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [ownerRef, ownerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });

  // スクロール位置を監視して、ボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたらボタンを表示
      setShowScrollTop(window.scrollY > 100);

      // ファーストビュー（動画）の高さを取得
      const firstView = document.querySelector('header');
      if (firstView) {
        const firstViewHeight = firstView.offsetHeight;
        // 80%を過ぎたらCTA表示
        if (window.scrollY > firstViewHeight * 0.8) {
          setShowFixedCTA(true);
        } else {
          setShowFixedCTA(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへスクロール
  // ハンバーガーメニューの開閉状態
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // ヘッダーの高さを考慮してオフセットを調整（必要に応じて調整）
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false); // メニューを閉じる
    }
  };

  // 悩みセクションの各項目用のIntersectionObserver
  const concerns = [
    "「人気サロンで技術を磨きたい」と入社したが、先輩からの厳しい監視と指導で人間不信に",
    "「推しのライブに行きたい」と休みを申請しても「みんな我慢してるのに」と却下される",
    "「人から悪く思われたくない」という気持ちから無理をし続け、心身ともに疲弊",
    "「もっと頑張らないと」というプレッシャーで心が休まらない。重責を任されすぎてキャパオーバー",
  ];

  const concernRefs = concerns.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  }));

  // アニメーション用のIntersectionObserver設定を確認
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // より早くトリガーされるように閾値を下げる
    rootMargin: '-50px'
  });

  // アニメーションクラスの定義を確認
  const fadeInUpClass = 'transition-all duration-1000 ease-out';
  const fadeInUpAnimation = (inView) => 
    `${fadeInUpClass} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;

  // 特徴セクション用のIntersectionObserver設定を追加
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  // アニメーション制御用のstateを追加
  const [startAnimation, setStartAnimation] = useState(false);

  // contentInViewが変更されたときに1秒後にアニメーションを開始
  useEffect(() => {
    if (contentInView) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation(false);
    }
  }, [contentInView]);

  // 各セクション用のアニメーション制御stateを追加
  const [startAnimation1, setStartAnimation1] = useState(false);
  const [startAnimation2, setStartAnimation2] = useState(false);
  const [startAnimation3, setStartAnimation3] = useState(false);

  // 各セクションのIntersectionObserver設定
  const [section1Ref, section1InView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [section2Ref, section2InView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const [section3Ref, section3InView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  // 各セクションが表示されたときに1秒後にアニメーションを開始
  useEffect(() => {
    if (section1InView) {
      const timer = setTimeout(() => {
        setStartAnimation1(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation1(false);
    }
  }, [section1InView]);

  useEffect(() => {
    if (section2InView) {
      const timer = setTimeout(() => {
        setStartAnimation2(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation2(false);
    }
  }, [section2InView]);

  useEffect(() => {
    if (section3InView) {
      const timer = setTimeout(() => {
        setStartAnimation3(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartAnimation3(false);
    }
  }, [section3InView]);

  // 悩みセクション用のIntersectionObserver設定を調整
  const { ref: concernsRef, inView: concernsInView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // より早くトリガーされるように閾値を下げる
    rootMargin: '-10px' // マージンを小さくしてより早くトリガー
  });

  return (
    <div className="font-noto-sans relative max-w-[393px] mx-auto bg-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-[#d2b48c] shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          {/* 左側：ロゴ */}
          <div className="flex-shrink-0">
            <img
              src="/image/logo.png"
              alt="luum"
              className="h-10 w-auto"
            />
          </div>
          
          {/* 右側：ハンバーガーメニュー */}
          <button 
            className="flex flex-col items-center justify-center w-10 h-10 space-y-1.5 relative z-[60]"
            aria-label="メニュー"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* ハンバーガーメニューのオーバーレイ */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* サイドメニュー */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* 閉じるボタン */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#d2b48c] transition-colors duration-200"
            aria-label="メニューを閉じる"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="px-6">
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => scrollToSection('reasons')}
                className="w-full text-left text-lg text-gray-800 hover:text-[#d2b48c] transition-colors duration-200 py-3 border-b border-gray-200"
                style={{ fontFamily: 'Yu Mincho, serif' }}
              >
                luumが選ばれる理由
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('recommended')}
                className="w-full text-left text-lg text-gray-800 hover:text-[#d2b48c] transition-colors duration-200 py-3 border-b border-gray-200"
                style={{ fontFamily: 'Yu Mincho, serif' }}
              >
                このような方におすすめ
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('pricing')}
                className="w-full text-left text-lg text-gray-800 hover:text-[#d2b48c] transition-colors duration-200 py-3 border-b border-gray-200"
                style={{ fontFamily: 'Yu Mincho, serif' }}
              >
                料金プラン
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('faq')}
                className="w-full text-left text-lg text-gray-800 hover:text-[#d2b48c] transition-colors duration-200 py-3 border-b border-gray-200"
                style={{ fontFamily: 'Yu Mincho, serif' }}
              >
                よくある質問
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* ファーストビュー画像 */}
      <div className="relative bg-[#fafafa] overflow-hidden">
        <img
          src="/image/luum3.jpeg"
          alt="ファーストビュー画像"
          className="w-full h-[60vh] object-cover"
          style={{ maxHeight: '100vh' }}
        />
      </div>

      {/* 動画下にテキストを移動 */}
      <section className="bg-white py-8 md:py-16 px-4 text-center">
        <p className="text-2xl md:text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Yu Mincho, serif' }}>
          整うコトで、全てが変わる。
        </p>
        <p className="text-lg md:text-2xl leading-loose max-w-2xl mb-6 text-center" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
          家族を優先してきたあなたへ。<br />
          今度は、自分を整える番です。<br /><br />
          luumは、心と体を整えながら、<br />
          本来の美しさを育てていける場所。
        </p>
        
      </section>

      <section className="bg-white py-8 md:py-16 text-center">
        <SectionHeader 
          title={`子育てが落ち着いても、\n"満たされない"理由がわからない`}
          style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}
          showLine={false}
        />
        <div className="w-full">
          <div className="flex justify-center">
            <img 
              src="/image/nayami1.png" 
              alt="悩みの画像"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-8 md:py-16 text-center">
        <SectionHeader 
          title={`luumに通うと・・・`}
          style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}
          showLine={false}
        />
        

        <p className="text-lg md:text-2xl leading-loose max-w-2xl mb-6 text-left px-8" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
          整える時間が、あなたの"心と体"を、美しく生まれ変わらせます。
        </p>
        
        <div className="max-w-2xl mx-auto px-8 mb-6">
          <ul className="space-y-3 text-base md:text-lg leading-relaxed text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 self-center">✓</span>
              <span className="text-left" style={{ color: '#374151' }}>姿勢が整い、背筋が自然と伸びる</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 self-center">✓</span>
              <span className="text-left" style={{ color: '#374151' }}>代謝が上がり、体のラインが引き締まる</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 self-center">✓</span>
              <span className="text-left" style={{ color: '#374151' }}>深い呼吸で、心まで軽くなる</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 self-center">✓</span>
              <span className="text-left" style={{ color: '#374151' }}>"整う時間"を通して、自分を大切にできるようになる</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 flex-shrink-0 self-center">✓</span>
              <span className="text-left" style={{ color: '#374151' }}>気づけば、表情まで明るく、日常に自信が戻ってくる</span>
            </li>
          </ul>
        </div>
        <div className="max-w-2xl mx-auto px-8 mb-6">
          <div className="flex justify-center">
            <img 
              src="/image/tokutyou.png" 
              alt="悩みの画像"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section id="reasons" className="bg-white py-8 md:py-16 text-center">
        <SectionHeader 
          title={`luumが選ばれる理由`}
          style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#d2b48c' }}
          
        />
        
        <p className="text-xl md:text-3xl leading-loose max-w-2xl mb-6 text-left px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
        一人ひとりに寄り添う、セミパーソナルレッスン
        </p>
        
        <div className="max-w-2xl mx-auto px-8 mb-6">
          <ul className="space-y-3 text-base md:text-lg leading-loose text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
            <li className="flex items-start">
              
              <span className="text-left" style={{ color: '#374151' }}>最大8名までの少人数制。
大手スタジオのように流れ作業ではなく、
講師が一人ひとりの身体の癖や状態を丁寧にサポート。
"無理なく整う"実感が、続けるほどに深まります。</span>
            </li>
            
          </ul>
         </div>

        <div className="max-w-2xl mx-auto px-8 mb-6">
          <div className="flex justify-center">
            <img 
              src="/image/kayouto.png" 
              alt="悩みの画像"
              className="w-full h-auto"
            />
          </div>
        </div>
        <p className="text-xl md:text-3xl leading-loose max-w-2xl mb-6 text-left px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
         女性の感性を満たす、上質で心地よい空間
        </p>
        
        <div className="max-w-2xl mx-auto px-8 mb-6">
          <ul className="space-y-3 text-base md:text-lg leading-loose text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
            <li className="flex items-start">
              
              <span className="text-left" style={{ color: '#374151' }}>美容室を運営してきた私たちがこだわった、
女性のための美しい内装と居心地。
「自分のための時間」を過ごす場所として、
通うたびに心が整い、気分が上がるスタジオです。</span>
            </li>
            
          </ul>
         </div>

        <div className="max-w-2xl mx-auto px-8 mb-6">
          <div className="flex justify-center">
            <img 
              src="/image/tokutyou1.png" 
              alt="悩みの画像"
              className="w-full h-auto"
            />
          </div>
        </div>
        <p className="text-xl md:text-3xl leading-loose max-w-2xl mb-6 text-left px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
        ”美と健康"をトータルで支える、特別なサポート
        </p>
        
        <div className="max-w-2xl mx-auto px-8 mb-6">
          <ul className="space-y-3 text-base md:text-lg leading-loose text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
            <li className="flex items-start">
              
              <span className="text-left" style={{ color: '#374151' }}>水素水が飲み放題で、身体の内側からも美しく。
さらに、美容院との連携でヘアケアや美容商材も体験可能。
外側と内側、両方から「整える」を叶えます。</span>
            </li>
            
          </ul>
         </div>

        <div className="max-w-2xl mx-auto px-8 mb-6">
          <div className="flex justify-center">
            <img 
              src="/image/tokutyou2.png" 
              alt="悩みの画像"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

       <section id="recommended" className="bg-white py-8 md:py-16 text-center">
         <SectionHeader 
           title={`このような方におすすめです`}
           style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#d2b48c' }}
           
         />
         <p className="text-lg md:text-2xl leading-loose max-w-2xl mb-6 text-left px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
         家族のために頑張ってきたけれど、そろそろ“自分のための時間”も大切にしたい。そんな40代女性のあなたへ。
        </p>
         
         <div className="max-w-6xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             {/* カード1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 border border-gray-100">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#c9a87a] flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>1</span>
                </div>
                <img 
                  src="/image/osusume1.png" 
                  alt="姿勢や体型"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-5 text-left" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                  最近、鏡に映る自分の姿勢や体型が気になる
               </h3>
                <p className="text-xs leading-relaxed text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                  背中が丸くなった気がする、下腹やお尻のラインが変わってきた…<br />「このまま年齢に流されるのはイヤ」と思ったことはありませんか？
               </p>
              </div>
             </div>

             {/* カード2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 border border-gray-100">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#c9a87a] flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>2</span>
                </div>
                <img 
                  src="/image/osusume2.png" 
                  alt="運動"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-5 text-left" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                 激しい運動は苦手。でも、何か始めたい
               </h3>
                <p className="text-xs leading-relaxed text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                 汗だくで頑張るよりも、"整える"動きで無理なく変わりたい。<br />ピラティスなら、体の内側から美しく整う感覚が実感できます。
               </p>
              </div>
             </div>

             {/* カード3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 border border-gray-100">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#c9a87a] flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>3</span>
                </div>
                <img 
                  src="/image/osusume3.png" 
                  alt="自分時間"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-5 text-left" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                 子育ても落ち着き、"自分時間"を取り戻したい
               </h3>
                <p className="text-xs leading-relaxed text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                 家族中心の毎日の中で、少しずつ忘れていた"自分の感覚"。<br />週に数回、静かに心と体に向き合う時間が、心の余裕を取り戻してくれます。
               </p>
              </div>
             </div>

             {/* カード4 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 border border-gray-100">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#c9a87a] flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>4</span>
                </div>
                <img 
                  src="/image/osusume4.png" 
                  alt="女性専用空間"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-5 text-left" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                 女性だけの、安心できる空間で過ごしたい
               </h3>
                <p className="text-xs leading-relaxed text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                 スタジオは女性専用・少人数制。<br />誰かと比べることなく、自分のペースで続けられます。
               </p>
              </div>
             </div>

             {/* カード5 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 border border-gray-100 md:col-span-2">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d2b48c] to-[#c9a87a] flex items-center justify-center shadow-md">
                  <span className="text-lg font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>5</span>
                </div>
                <img 
                  src="/image/osusume5.png" 
                  alt="美しく生きる"
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium mb-4 text-left" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                 年齢を重ねても、美しく、心地よく生きたい
               </h3>
                <p className="text-xs leading-relaxed text-left" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                 姿勢が整うと、表情も明るくなり、日々の動きも軽やかに。<br />"整える時間"が、あなたの暮らしそのものを変えていきます。
               </p>
              </div>
             </div>
           </div>

           </div>

           {/* 締めコピー */}
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6 text-left px-8" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
               luumは、がんばる女性が「自分を大切にする時間」を取り戻せる場所です。忙しさの中で忘れていた"心地よさ"を、ここで一緒に見つけませんか？
             </p>
         
        </section>

          {/* 店舗紹介セクション */}
          
          <section className="bg-white pt-12 md:pt-16 pb-6 md:pb-8 text-center">
           <div className="text-center mb-6">
             <p className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Yu Mincho, serif', color: '#d2b48c' }}>
               2025年12月1日プレオープン！
             </p>
           </div>
           <p className="text-base md:text-lg leading-loose max-w-2xl mx-auto mb-6 text-left px-8" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
             愛知県春日井市にある女性専用マシンピラティススタジオ。40代女性が"自分を整える時間"を取り戻せる特別な空間です。女性専用・少人数制で、水素水飲み放題。美容院との連携でトータルケアも。まずは0円の体験レッスンから。
           </p>
         </section>

        {/* TAKE A PILATES LESSON セクション */}
        <section className="pt-8 md:pt-12 pb-16">
          {/* 上部：横長画像 */}
          <div className="w-full mb-0">
            <img 
              src="/image/price1.png" 
              alt="luumスタジオ" 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* 下部：背景画像 + 緑色カバー + コンテンツ */}
          <div 
            className="relative w-full h-[500px] bg-cover bg-center flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/image/luum12.jpeg')" }}
          >
            {/* 緑色の半透明カバー */}
            <div className="absolute inset-0 bg-[#2C5F4F]/70"></div>

            {/* コンテンツ */}
            <div className="relative z-10 text-center text-white px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-wider" style={{ fontFamily: 'Arial, sans-serif' }}>
                TAKE A PILATES LESSON
              </h2>
              <p className="text-lg md:text-xl mb-8" style={{ fontFamily: 'Yu Mincho, serif' }}>
              12月1日〜無料体験会開催！
              </p>

              <p className="text-xl md:text-2xl mb-4" style={{ fontFamily: 'Yu Mincho, serif' }}>
              体験予約または<br />LINE登録で詳細をお届け。
              </p>
              <p className="text-xl md:text-2xl mb-4" style={{ fontFamily: 'Yu Mincho, serif' }}>
              入会金・事務手数料・施設利用料
              </p>

              <div className="text-5xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                \ ¥0 /
            </div>

              <a 
                href="/form"
                className="inline-block bg-gradient-to-b from-[#D4A5A5] to-[#B88888] hover:from-[#C49090] hover:to-[#A67777] text-white font-medium py-4 px-12 rounded-md transition-colors duration-300 text-lg"
                style={{ fontFamily: 'Yu Mincho, serif' }}
              >
                体験レッスンを予約
              </a>
            </div>
          </div>
        </section>

       

        <section id="pricing" className="bg-white py-8 md:py-16 text-center">
        <SectionHeader 
          title={`PRICE`}
          style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#d2b48c' }}
          
        />
        
        <p className="text-lg md:text-2xl leading-loose max-w-2xl mb-6 text-center px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
        通いやすい料金プラン
        </p>

        <p className="text-base text-gray-600 mb-8">※表示価格は全て税込価格になります。</p>

        {/* 料金プランカード */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
          
          {/* プラン1: 通常料金プラン */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-300">
            {/* ヘッダー */}
            <div className="bg-gray-600 text-white text-center py-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif' }}>
                通常料金プラン
              </h3>
                  </div>

            {/* コンテンツ */}
            <div className="p-8">
              <p className="text-center text-lg mb-6" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                基本の月会費制
              </p>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-4">月会費</p>

                <div className="space-y-3 mb-6">
                  <div className="border-b border-gray-200 pb-2">
                    <p className="text-xl font-bold" style={{ color: '#374151' }}>月3回</p>
                    <p className="text-3xl font-bold text-gray-800">¥11,000</p>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <p className="text-xl font-bold" style={{ color: '#374151' }}>月4回</p>
                    <p className="text-3xl font-bold text-gray-800">¥14,300</p>
                  </div>
                  <div className="border-b border-gray-200 pb-2">
                    <p className="text-xl font-bold" style={{ color: '#374151' }}>通い放題</p>
                    <p className="text-3xl font-bold text-gray-800">¥20,900</p>
                </div>
              </div>
            </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-center text-sm text-gray-600 mb-3">初回のみ以下の初期費用</p>
                <div className="space-y-1 text-center mb-3">
                  <p className="text-gray-700 text-sm">入会金 ¥5,500</p>
                  <p className="text-gray-700 text-sm">事務手数料 ¥5,500</p>
                  <p className="text-gray-700 text-sm">施設利用料 ¥3,000</p>
                  </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">合計</p>
                  <p className="text-3xl font-bold" style={{ color: '#374151' }}>¥14,000</p>
                  </div>
                </div>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                対象プラン：全プラン対象<br />
                ※継続期間の縛りはありません。
                </p>
              </div>
            </div>

          {/* プラン2: 3ヶ月継続プラン */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* ヘッダー */}
            <div className="bg-[#9B8AC4] text-white text-center py-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif' }}>
                3ヶ月継続お約束プラン
              </h3>
          </div>

            {/* コンテンツ */}
            <div className="p-8">
              <p className="text-center text-lg mb-6" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                初月のご入会で<span className="text-[#9B8AC4] font-bold text-xl">お得</span>にスタート！
              </p>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">通常料金</p>
                <div className="space-y-1 mb-4">
                  <p className="text-gray-400 line-through">月3回 ¥11,000</p>
                  <p className="text-gray-400 line-through">月4回 ¥14,300</p>
                  <p className="text-gray-400 line-through">通い放題 ¥20,900</p>
                </div>

                <div className="inline-block bg-[#9B8AC4] text-white px-6 py-2 rounded-full mb-4">
                  <span className="text-lg font-medium">初月特別価格</span>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-2xl font-bold" style={{ color: '#374151' }}>月3回 <span className="text-3xl">¥4,400</span></p>
                  <p className="text-2xl font-bold" style={{ color: '#374151' }}>月4回 <span className="text-3xl">¥5,500</span></p>
                  <p className="text-2xl font-bold" style={{ color: '#374151' }}>通い放題 <span className="text-3xl">¥8,800</span></p>
                      </div>
                      </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-center text-sm text-gray-600 mb-3">さらに！</p>
                <div className="space-y-1 text-center mb-3">
                  <p className="text-gray-400 line-through text-sm">入会金 ¥5,500</p>
                  <p className="text-gray-400 line-through text-sm">事務手数料 ¥5,500</p>
                  <p className="text-gray-400 line-through text-sm">施設利用料 ¥3,000</p>
                    </div>
                <div className="text-center mb-4">
                  <div className="inline-block bg-[#9B8AC4] text-white px-8 py-3 rounded-lg mb-4">
                    <span className="text-lg font-medium">入会金&事務手数料&施設利用料無料！</span>
                </div>
              </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2" style={{ color: '#374151' }}>¥0</p>
            </div>
          </div>

              {/* お得額の表示 */}
              <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF4D6] border-2 border-[#FFD700] rounded-xl p-6 mb-6 shadow-sm">
                <p className="text-center text-base font-bold text-[#D2691E] mb-4">🔸 通常料金と比べて...</p>
                
                <div className="text-center mb-4">
                  <p className="text-lg text-gray-700 mb-2">3ヶ月で最大</p>
                  <p className="text-5xl font-bold text-[#E67E22] mb-2">¥26,100</p>
                  <p className="text-2xl font-bold text-[#E67E22]">お得！</p>
                  <p className="text-sm text-gray-600 mt-3">（通い放題プランの場合）</p>
                </div>

                <div className="border-t border-[#FFD700]/30 pt-4 mt-4">
                  <p className="text-sm text-gray-700 leading-relaxed text-center mb-3">
                    入会金・事務手数料・施設利用料<span className="font-bold text-[#E67E22]">0円</span><br />
                    ムダな初期費用なしで、気軽に始められるプランです。
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed text-left">
                    3ヶ月間は、あなたが"整う"実感を得るためのお約束期間。
                    無理なく続けて、しっかり変化を感じましょう。
                  </p>
                </div>
          </div>
          
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                対象プラン：全プラン対象
              </p>
            </div>
        </div>
        
          {/* プラン3: 6ヶ月継続プラン */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* ヘッダー */}
            <div className="bg-[#9B8AC4] text-white text-center py-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif' }}>
                6ヶ月継続お約束プラン
              </h3>
            </div>

            {/* コンテンツ */}
            <div className="p-8">
              <p className="text-center text-lg mb-6" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
                <span className="text-[#9B8AC4] font-bold text-xl">お得</span>に継続したい方におすすめ！
              </p>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">通常料金</p>
                <div className="space-y-1 mb-4">
                  <p className="text-gray-400 line-through">月3回 ¥11,000</p>
                  <p className="text-gray-400 line-through">月4回 ¥14,300</p>
                  <p className="text-gray-400 line-through">通い放題 ¥20,900</p>
          </div>

                <div className="inline-block bg-[#9B8AC4] text-white px-6 py-2 rounded-full mb-4">
                  <span className="text-lg font-medium">初月特別価格</span>
        </div>

                <div className="mb-6">
                  <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#374151' }}>¥0</p>
                  <p className="text-base text-gray-600">（全プラン対象）</p>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  2ヶ月目からお好きなプランをお選びいただけます
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xl font-bold" style={{ color: '#374151' }}>月3回 ¥11,000</p>
                  <p className="text-xl font-bold" style={{ color: '#374151' }}>月4回 ¥14,300</p>
                  <p className="text-xl font-bold" style={{ color: '#374151' }}>通い放題 ¥20,900</p>
              </div>
                </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-center text-sm text-gray-600 mb-3">さらに！</p>
                <div className="space-y-1 text-center mb-3">
                  <p className="text-gray-400 line-through text-sm">入会金 ¥5,500</p>
                  <p className="text-gray-400 line-through text-sm">事務手数料 ¥5,500</p>
                  <p className="text-gray-400 line-through text-sm">施設利用料 ¥3,000</p>
              </div>
                <div className="text-center mb-4">
                  <div className="inline-block bg-[#9B8AC4] text-white px-8 py-3 rounded-lg mb-4">
                    <span className="text-lg font-medium">入会金&事務手数料&施設利用料無料！</span>
                </div>
              </div>
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2" style={{ color: '#374151' }}>¥0</p>
            </div>
              </div>

              {/* お得額の表示 */}
              <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF4D6] border-2 border-[#FFD700] rounded-xl p-6 mb-6 shadow-sm">
                <p className="text-center text-base font-bold text-[#D2691E] mb-4">🔸 通常料金と比べて...</p>
                
                <div className="text-center mb-4">
                  <p className="text-lg text-gray-700 mb-2">6ヶ月で最大</p>
                  <p className="text-5xl font-bold text-[#E67E22] mb-2">¥34,900</p>
                  <p className="text-2xl font-bold text-[#E67E22]">お得！</p>
                  <p className="text-sm text-gray-600 mt-3">（通い放題プランの場合）</p>
              </div>

                <div className="border-t border-[#FFD700]/30 pt-4 mt-4">
                  <p className="text-sm text-gray-700 leading-relaxed text-center mb-3">
                    初月は<span className="font-bold text-[#E67E22]">無料</span>で体験。<br />
                    2ヶ月目から、自分に合ったペースでプランを選べます。
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed text-left">
                    まずはお試し → 続けながら変わるを叶える
                    今だけのオープン記念キャンペーンです。
                  </p>
            </div>
          </div>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                対象プラン：全プラン対象
              </p>
          </div>
    </div>
    
  </div>

</section>

        <section id="faq" className="bg-white py-8 md:py-16">
        <div className="text-center mb-12">
        <SectionHeader 
            title={`FAQ`}
            style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#d2b48c' }}
          />
          <p className="text-lg md:text-2xl leading-loose max-w-2xl mx-auto mb-6 px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
            よくある質問
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {[
              {
                question: "トライアルレッスンを受講したいのですが、どうすればいいですか？",
                answer: "レッスンは全て予約制となっております。\n予約フォームからご予約が可能です。「体験する店舗を探す」よりお進みください。\nお電話でのご予約も承っております。\nTEL：0570-050-055\n電話受付時間：平日・土日祝 9:00〜18:00"
              },
              {
                question: "友達と一緒にトライアルレッスンを受けたいのですが、可能ですか？",
                answer: "もちろん可能です。WEBからご予約をいただく場合は、一名様ずつトライアルレッスンのお申込みをお願い致します。\nお電話の場合は、代表者様からご連絡をいただく事で一度にご予約が可能です。ご予約を希望されるお客様のお名前・お電話番号・生年月日をお伝えください。"
              },
              {
                question: "トライアルレッスンの持ち物は何ですか？",
                answer: "トライアルレッスンは上下ウェアがレンタルに含まれます。\n必要に応じて下記のものをご用意ください。\n\n【レッスン】\n・靴下（レッスン中は靴下着用必須となります。当スタジオオリジナルのすべり止め付きソックスも店頭で販売しております）\n・汗拭きタオル\n・水分補給用の飲料（お水をお勧めします）\n\n【ご入会手続き】\n・現金、クレジットカード（月会費、施設利用料、施設維持費の前納金分）\n・キャッシュカードもしくは口座情報のわかる物\n・身分証明書（免許書、保険証、パスポート、マイナンバーカード等）\n\nトライアルレッスン当日限定でご入会キャンペーンをご利用いただけます！\n当日のお支払いにつきましてはご利用のキャンペーン、コースによって異なります。"
              },
              {
                question: "トライアルレッスンは何分前に行けばよいですか？",
                answer: "レッスン開始25分前にご来店いただき、簡単な体調チェックや館内説明がございます。\nレッスン終了後は、お着替え、レッスンのご案内やお手続きなども含めてお帰りまで約2時間程度お時間を見ていただいております。"
              },
              {
                question: "トライアルレッスン当日はどれくらい時間が必要ですか？",
                answer: "レッスン開始25分前にご来店いただき、簡単な体調チェックや館内説明がございます。\nレッスン終了後は、お着替え、レッスンのご案内やお手続きなども含めてお帰りまで約2時間程度お時間を見ていただいております。"
              },
              {
                question: "トライアルレッスンを2回以上利用することはできますか？",
                answer: "恐れ入りますが、トライアルレッスンを受講できるのは一名様につき1回限りとさせていただいております。\n2回目以降のご利用には入会手続きが必要となります。ご入会を検討されている方はご入会希望店舗にてトライアルレッスンのご予約・ご来店をお願いいたします。"
              }
            ].map((faq, index) => (
              <details 
                key={index} 
                className="border-l-2 group"
                style={{ borderColor: '#d2b48c' }}
              >
                <summary className="pl-6 pr-4 py-4 cursor-pointer list-none flex justify-between items-start text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base md:text-lg text-gray-800 pr-4" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif' }}>
                    {faq.question}
                  </span>
                  <span className="transform group-open:rotate-180 transition-transform duration-300 flex-shrink-0 mt-1" style={{ color: '#d2b48c' }}>
                    ▼
                  </span>
                </summary>
                <div className="pl-6 pr-4 pb-4 pt-2 text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < faq.answer.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4 pb-28 md:pb-32">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4 flex items-center">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://www.instagram.com/mallow_hair.flower?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center hover:text-[#4a90e2] transition-colors"
                  >
                    <i className="fab fa-instagram text-xl mr-2"></i>
                    <span className="text-sm">luum公式</span>
                  </a>
                  
                  
                  
                  
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
               
                 
              <p>住所：〒486-0849 愛知県春日井市八田町７－１－１３エイトプラット</p>
              <p>営業時間：9:30〜21:00</p>
              <p>定休日：不定休</p>
              <div className="mt-4 w-full h-[300px] md:h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.078199829464!2d136.96784387576872!3d35.254310272728034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6003730079a4c85d%3A0x8f9183e8a652c9b9!2zRWlHSFQgUExhVCBLQVNVR0FJKOOCqOOCpOODiOODl-ODqeODg-ODiOaYpeaXpeS6lSk!5e0!3m2!1sja!2sjp!4v1761116618009!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
        </div>
      </footer>

      {/* トップへ戻るボタン */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-40 bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <span className="sr-only">トップへ戻る</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* 画面下部固定CTA（ファーストビュー80%過ぎたら表示） */}
      {showFixedCTA && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-lg">
          <div className="flex">
            {/* 体験予約ボタン */}
          <Link
              href="/form"
              className="flex-1 bg-gradient-to-b from-[#D4A5A5] to-[#B88888] text-white text-center py-4 hover:from-[#C49090] hover:to-[#A67777] transition duration-300 flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-center mb-1">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium tracking-wider">TRIAL</span>
              </div>
              <span className="text-base font-bold">体験予約</span>
          </Link>

            {/* LINE登録ボタン */}
            <a
              href="https://line.me/R/ti/p/@YOUR_LINE_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-gray-700 border-l border-gray-200 text-center py-4 hover:bg-gray-50 transition duration-300 flex flex-col items-center justify-center"
            >
              <div className="flex items-center justify-center mb-1">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 2H5C3.346 2 2 3.346 2 5v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V5c0-1.654-1.346-3-3-3zm-7 15c-3.866 0-7-2.462-7-5.5S8.134 6 12 6s7 2.462 7 5.5-3.134 5.5-7 5.5z"/>
                </svg>
                <span className="text-xs font-medium tracking-wider">LINE</span>
              </div>
              <span className="text-base font-bold">登録</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return <MainComponent />;
}