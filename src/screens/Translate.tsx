import React, { useContext, useState } from 'react';
import { audioToText, textToAudio } from '../../helpers/ai';
import AppHeader from '../organisms/AppHeader';
import { LangContext, LangContextType } from '../context/lang/langContext';
import RecordLayout from '../organisms/RecordLayout';
import TranslationLayout from '../organisms/TranslationLayout';

function Translate() {
  const { lang } = useContext(LangContext) as LangContextType;
  const [resText, setResText] = useState('');
  const [translationUrl, setTranslationUrl] = useState('');
  const [loading, setLoading] = React.useState(false);

  const clearTranslation = () => {
    setTranslationUrl('');
    setResText('');
  };

  const translate = async (path: string) => {
    setLoading(true);
    audioToText(path, lang).then(res => {
      textToAudio(res).then(audioUrl => {
        setResText(res);
        setLoading(false);
        setTranslationUrl(audioUrl);
      });
    });
  };

  return (
    <>
      <AppHeader />
      <RecordLayout
        loading={loading}
        clearTranslation={clearTranslation}
        translate={translate}
      />
      <TranslationLayout text={resText} translationUrl={translationUrl} />
    </>
  );
}

export default Translate;
