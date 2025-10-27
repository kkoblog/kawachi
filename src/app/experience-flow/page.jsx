'use client';

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

export default function ExperienceFlow() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <section className="bg-white py-8 md:py-16 text-center">
        <SectionHeader 
          title="体験の流れ"
          style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#d2b48c' }}
        />
        <p className="text-lg md:text-2xl leading-loose max-w-2xl mx-auto mb-6 text-center px-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
        初めての方も安心してお越しください
        </p>
      </section>

      {/* 体験の流れ */}
      <section className="pt-4 pb-16 px-4 max-w-6xl mx-auto">
        <div className="space-y-0">
          
          {/* Step 1 */}
          <div className="bg-white border border-gray-200">
            <div className="flex flex-row">
              {/* 左側：画像 */}
              <div className="w-1/3 bg-[#ede4e1] flex items-center justify-center p-4 sm:p-8">
                <img 
                  src="/image/lessun1.png" 
                  alt="体験レッスン予約"
                  className="w-full aspect-square object-cover"
                />
              </div>
              {/* 右側：テキスト */}
              <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4" style={{ fontFamily: 'Yu Mincho, serif', color: '#d2b48c' }}>
                  01 ｜ 体験レッスン予約
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                  お電話またはWebフォームから、お気軽にご予約ください。ご都合の良い日時をお選びいただけます。初めての方も安心してお問い合わせください。
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-gray-200">
            <div className="flex flex-row">
              <div className="w-1/3 bg-[#ede4e1] flex items-center justify-center p-4 sm:p-8">
                <img 
                  src="/image/tokutyou1.png" 
                  alt="ご来店・受付"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4" style={{ fontFamily: 'Yu Mincho, serif', color: '#d2b48c' }}>
                  02 ｜ ご来店・受付
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                  ご予約時間の10分前にお越しください。受付で簡単なアンケートにご記入いただきます。動きやすい服装でお越しいただくか、更衣室でお着替えいただけます。
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-gray-200">
            <div className="flex flex-row">
              <div className="w-1/3 bg-[#ede4e1] flex items-center justify-center p-4 sm:p-8">
                <img 
                  src="/image/lessun3.png" 
                  alt="カウンセリング"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4" style={{ fontFamily: 'Yu Mincho, serif', color: '#d2b48c' }}>
                  03 ｜ カウンセリング
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                  お体のお悩みや目標について、インストラクターがゆっくりお話を伺います。運動経験がなくても大丈夫。気になることは何でもお気軽にご相談ください。
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-gray-200">
            <div className="flex flex-row">
              <div className="w-1/3 bg-[#ede4e1] flex items-center justify-center p-4 sm:p-8">
                <img 
                  src="/image/luum9.jpeg" 
                  alt="体験レッスン"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4" style={{ fontFamily: 'Yu Mincho, serif', color: '#d2b48c' }}>
                  04 ｜ 施設ご案内・マシンのご説明
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                  スタジオ内をご案内し、使用するマシンの使い方を丁寧にご説明します。初めての方にもわかりやすくお伝えしますので、ご安心ください。
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white border border-gray-200">
            <div className="flex flex-row">
              <div className="w-1/3 bg-[#ede4e1] flex items-center justify-center p-4 sm:p-8">
                <img 
                  src="/image/lessun5.png" 
                  alt="体験レッスン"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                <h3 className="text-base sm:text-xl md:text-2xl mb-2 sm:mb-4" style={{ fontFamily: 'Yu Mincho, serif', color: '#d2b48c' }}>
                  05 ｜ 体験レッスン
                </h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#374151' }}>
                  ひとつひとつの動きを丁寧にサポートします。ご自身のペースで無理なく体を動かしていきましょう。呼吸を深めながら、心地よい時間をお過ごしください。
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* 持ち物セクション */}
      <section className="bg-[#F9F7F4] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
            体験時の持ち物
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <ul className="space-y-4 text-sm sm:text-base md:text-lg" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#6B7280' }}>
              <li className="flex items-start">
                <span className="text-[#d2b48c] mr-3 flex-shrink-0">✓</span>
                <span>動きやすい服装（Tシャツ・レギンスなど）</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d2b48c] mr-3 flex-shrink-0">✓</span>
                <span>タオル（汗拭き用）</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d2b48c] mr-3 flex-shrink-0">✓</span>
                <span>お飲み物</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d2b48c] mr-3 flex-shrink-0">✓</span>
                <span>靴下（5本指ソックスがおすすめ）</span>
              </li>
            </ul>
            
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'Yu Mincho, serif', color: '#374151' }}>
          まずは体験レッスンから
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-8" style={{ fontFamily: 'Hiragino Kaku Gothic, sans-serif', color: '#6B7280' }}>
          初めての方も安心してご参加いただけます
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="/form"
            className="inline-block bg-gradient-to-b from-[#D4A5A5] to-[#B88888] hover:from-[#C49090] hover:to-[#A67777] text-white font-medium py-3 sm:py-4 px-8 sm:px-12 rounded-md transition-colors duration-300 text-base sm:text-lg"
            style={{ fontFamily: 'Yu Mincho, serif' }}
          >
            体験レッスンを予約
          </a>
          <a 
            href="/"
            className="inline-block border-2 border-[#d2b48c] text-[#d2b48c] hover:bg-[#d2b48c] hover:text-white font-medium py-3 sm:py-4 px-8 sm:px-12 rounded-md transition-colors duration-300 text-base sm:text-lg"
            style={{ fontFamily: 'Yu Mincho, serif' }}
          >
            トップページへ戻る
          </a>
        </div>
      </section>
    </div>
  );
}

