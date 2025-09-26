import { Box, Button, Container, IconButton } from '@mui/material';
import CustomButton from 'src/Common/CustomButton';
import { Switch } from "@mui/material";
import { useMemo, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import GUIDELINE_UNDRAW from 'src/Assets/Icons/faceGuidelineIcon.png';
import { LIVENESS_GUIDELINES } from "src/Utils/Constants";

import { getUUID, isSmallScreen, toSentenceCase } from 'src/Utils/Helpers';

const LivePhotoGuidelinesForMobile = ({ closeSplashScreenHandler, language = 'en', onAudioLangChange }) => {
    const [audioLang, setAudioLang] = useState(language);
    // Notify parent on change
    const handleAudioLangChange = (lang) => {
        setAudioLang(lang);
        if (onAudioLangChange) onAudioLangChange(lang);
    };
    const guidelines = useMemo(() => LIVENESS_GUIDELINES, []);
    const [showVideo, setShowVideo] = useState(false);

    return (
        <Box sx={{
            background: 'white',
            position: 'absolute',
            zIndex: '1000',
            top: 0,
            left: 0,
            right: 0,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
        }}>
            <Container maxWidth="lg" sx={{ padding: '20px', paddingBottom: '120px', textAlign: { xs: 'center', sm: 'left' } }}>
                <Box sx={{ width: '100%', textAlign: { xs: 'center', sm: 'left' } }}>
                    <img src={GUIDELINE_UNDRAW} alt='Guidelines' height={'70px'} width={'80px'} />
                </Box>

                <Box>
                    <Box sx={{ marginTop: '20px', textAlign: { xs: 'center', sm: 'left' }, color: '#407ec9', fontSize: 'clamp(24px,2vw,30px)', fontWeight: 'bolder' }}>
                        {'Face Detection Guidelines'}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: audioLang === 'en' ? 'bold' : 'normal',
                            color: audioLang === 'en' ? '#e8927c' : 'inherit',
                            textDecoration: audioLang === 'en' ? 'underline' : 'none'
                        }}>English Voice</span>
                        <Switch
                            checked={audioLang === 'ur'}
                            onChange={e => handleAudioLangChange(e.target.checked ? 'ur' : 'en')}
                            color="primary"
                            inputProps={{ 'aria-label': 'audio language toggle' }}
                        />
                        <span style={{
                            fontSize: '12px',
                            fontWeight: audioLang === 'ur' ? 'bold' : 'normal',
                            color: audioLang === 'ur' ? '#e8927c' : 'inherit',
                            textDecoration: audioLang === 'ur' ? 'underline' : 'none'
                        }}>Urdu Voice</span>
                    </Box>

                    {isSmallScreen() && (
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Button
                                variant="text"
                                onClick={() => setShowVideo(true)}
                                sx={{
                                    textDecoration: 'underline',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                }}
                            >
                                Watch Video Tutorial
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>

                    </Box>
                    <Box sx={{ textAlign: 'left', marginBottom: '35px' }}>
                        {guidelines?.map((guideline) => (
                            <Box key={getUUID()} sx={{ margin: '12px 0px', color: 'white' }}>
                                <Box sx={{ color: '#407ec9', fontSize: '18px', fontWeight: 'bolder' }}>
                                    {toSentenceCase(guideline?.heading)}
                                </Box>
                                <Box sx={{ color: '#424242', fontSize: '12px' }}>
                                    {toSentenceCase(guideline?.content)}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box sx={{
                    position: 'fixed',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    background: '#fff',
                    p: 2,
                    boxShadow: 3,
                    zIndex: 999,
                    opacity: 0.98,
                    backdropFilter: 'blur(2px)'
                }}>
                    <CustomButton label="Begin Verification" onClick={closeSplashScreenHandler} />
                </Box>

                {/* Video Modal */}
                {
                    showVideo && (
                        <Box sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#dceeff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 9999,
                            padding: 2,
                            boxSizing: 'border-box'
                        }}>
                            <IconButton
                                onClick={() => setShowVideo(false)}
                                sx={{
                                    position: 'absolute',
                                    top: -5,
                                    right: -5,
                                    color: '#e8927c',
                                    zIndex: 1
                                }}
                            >
                                <FaTimes />
                            </IconButton>

                            <Box sx={{
                                width: '100%',
                                maxWidth: '400px',
                                height: 'calc(100vh - 40px)',
                                maxHeight: '712px',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '15px'
                            }}>
                                <iframe
                                    src="https://www.youtube-nocookie.com/embed/NvLZGzyxtQA?autoplay=1&enablejsapi=0&mute=0"
                                    title="Liveness Guidelines"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    loading="lazy"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                    }}
                                    allowFullScreen
                                />
                            </Box>
                        </Box>
                    )
                }
            </Container>
        </Box >
    );
};

export default LivePhotoGuidelinesForMobile;