const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const clickToCheckButton = () => {
  const checkButton = document.querySelector('[data-test="player-next"]');
  if (!checkButton) {
    console.log('No check button');
    return;
  }

  checkButton.click();
};

const doubleClickToCheckButton = async () => {
  clickToCheckButton();
  await sleep(1000);
  clickToCheckButton();
};

const clickQuitButton = () => {
  const checkButton = document.querySelector('[data-test="quit-button"]');
  if (!checkButton) {
    console.log('No quit button');
    return;
  }

  checkButton.click();
};

const clickNotificationButton = () => {
  const checkButton = document.querySelector('[data-test="notification-button"]');
  if (!checkButton) {
    console.log('No notif button');
    return;
  }

  checkButton.click();
};

const exitLevel = async () => {
  clickQuitButton();
  await sleep(100);
  clickNotificationButton();
  await sleep(5000);
  clickToCheckButton();
};

const SELECT_TO_SELECTORS_MAP = {
  どようび: '土曜日',
};

const clickToSelector = (hint) => {
  const allButtons = document.querySelectorAll(
    '[data-test*="challenge-characterSelect"] [data-test="challenge-choice"]',
  );
  if (!allButtons.length) throw new Error('No buttons');

  const buttonToClick = [...allButtons].find((val) => {
    const span = val.querySelector('div > span > span');
    return span.innerText === SELECT_TO_SELECTORS_MAP[hint];
  });

  if (!buttonToClick) throw new Error('No button');

  buttonToClick.click();
};

const playSelectorLevel = async () => {
  const selectorLevelHeader = document.querySelector(
    '[data-test*="challenge-characterSelect"] [data-test="challenge-header"] > span',
  );

  if (!selectorLevelHeader) throw new Error('No selector');

  clickToSelector(
    selectorLevelHeader.innerText
      .replace('Select the correct characters for “', '')
      .replace('”', ''),
  );

  await doubleClickToCheckButton();
};

const HINT_TO_SELECTORS_MAP = {
  'Excuse me, udon, please.': ['すみません', 'うどん', 'ください'],
  'Excuse me, coffee, please.': ['すみません', 'コーヒー', 'ください'],
  'Excuse me, green tea, please.': ['すみません', 'おちゃ', 'ください'],
  'Excuse me, ramen, please.': ['すみません', 'ラーメン', 'ください'],
  'This tempura, please.': ['この', 'てんぷら', 'ください'],
  'Udon, please.': ['うどん', 'ください'],
  'I sometimes do yoga.': ['ときどき', 'ヨガ', 'を', 'します'],
  'Do you often do yoga?': ['よく', 'ヨガ', 'を', 'します', 'か'],
  'Do you do yoga every day?': ['まいにち', 'ヨガ', 'を', 'します', 'か'],
  'I often do yoga with my family.': ['よく', 'かぞく', 'と', 'ヨガ', 'を', 'します'],
  'I eat pasta with my family every week.': [
    'まいしゅう',
    'かぞく',
    'と',
    'パスタ',
    'を',
    ,
    '食べます',
  ],
  'I always do yoga at seven thirty.': ['いつも', '七時', '半', 'に', 'ヨガ', 'を', 'します'],
  "I always eat breakfast at seven o'clock.": [
    'いつも',
    '七時',
    'に',
    'あさごはん',
    'を',
    '食べます',
  ],
  "I always listen to the radio at ten o'clock.": [
    'いつも',
    '十時',
    'に',
    'ラジオ',
    'を',
    'ききます',
  ],
  "I check e-mails around nine o'clock every night.": [
    'まいばん',
    '九時',
    'ごろ',
    'に',
    'メール',
    'を',
    '読みます',
  ],
  'I check e-mails every day.': ['まいにち', 'メール', 'を', '読みます'],
  'I check e-mails every night.': ['まいばん', 'メール', 'を', '読みます'],
  'The platforms are over there.': ['ホーム', 'は', 'あそこ', 'です'],
  "Oh, we don't have wifi.": ['あ', 'wifi', 'は', 'ありません'],
  "We don't have wifi.": ['wifi', 'は', 'ありません'],
  "Sorry, we don't have wifi.": ['すみません', 'wifi', 'は', 'ありません'],
  'Where is the transfer?': ['のりかえ', 'は', 'どこ', 'です', 'か'],
  'Where are the platforms?': ['ホーム', 'は', 'どこ', 'です', 'か'],
  'Um, where is the transfer?': ['ええと', 'のりかえ', 'は', 'どこ', 'です', 'か'],
  'The transfer is here.': ['のりかえ', 'は', 'ここ', 'です'],
  'The transfer is over there.': ['のりかえ', 'は', 'あそこ', 'です'],
  "Sorry, the transfer isn't here.": ['すみません', 'のりかえ', 'は', 'ここ', 'じゃないです'],
  "I'm going to swim next week.": ['らいしゅう', 'およぎます'],
  "I'm going to drink coffee with my older brother next week.": [
    'らいしゅう',
    'あに',
    'と',
    'コーヒー',
    'を',
    '飲みます',
  ],
  "I'm going to buy a new TV next week.": ['らいしゅう', '新しい', 'テレビ', 'を', '買います'],
  "I'm going to buy a new smartphone tomorrow.": ['あした', '新しい', 'スマホ', 'を', '買います'],
  "I'm going to buy new books tomorrow.": ['あした', '新しい', '本', 'を', '買います'],
  "I'm going to buy new clothes next week.": ['らいしゅう', '新しい', 'ふく', 'を', '買います'],
  'On weekends, I go out with friends.': ['しゅうまつ', 'は', 'ともだち', 'と', 'でかけます'],
  'On weekends, I buy books.': ['しゅうまつ', 'は', '本', 'を', '買います'],
  'Are you going to play baseball next week?': ['らいしゅう', 'やきゅう', 'を', 'します', 'か'],
  'I sometimes do yoga with Ken.': ['ときどき', 'けん', 'さん', , 'と', 'ヨガ', 'を', 'します'],
  "I'm going to talk to Ken next week.": ['らいしゅう', 'けん', 'さん', , 'と', '話します'],
  'Do you eat pasta every week?': ['まいしゅう', 'パスタ', 'を', , '食べます', 'か'],
};

const getHint = (hint) => [...hint.children].map((span) => span.innerText).join('');

const clickToButtonsWithText = (hint) => {
  HINT_TO_SELECTORS_MAP[hint]?.forEach((val) => {
    const button = document.querySelector(`[data-test^=${val}-]`);
    if (!button) return;
    button.click();
  });
};

const playButtonLevel = async () => {
  const hint = document.querySelector('[dir="ltr"] > span');
  if (!hint) throw new Error('No hint');

  clickToButtonsWithText(getHint(hint));
  await doubleClickToCheckButton();
  return true;
};

const playLevel = async () => {
  const isHintLevel = !!document.querySelector(
    '[data-test*="challenge-characterSelect"] [data-test="challenge-header"] > span',
  );
  if (isHintLevel) {
    await playSelectorLevel();
  } else {
    try {
      await playButtonLevel();
    } catch {
      exitLevel();
    }
  }
};

const launchCycledLevel = async () => {
  const playAndSleep = async () => {
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    await playLevel();
    await sleep(700);
    return;
  };

  playAndSleep();
};

const start = async () => {
  const butt1 = document.querySelector('[data-test="skill-path-level-trophy-9"]');
  butt1.click();
  await sleep(1000);
  const butt2 = document.querySelector('[href="/lesson/unit/10/level/11"]');
  butt2.click();
  await sleep(5000);
  clickToCheckButton();
  launchCycledLevel();
};

start();
