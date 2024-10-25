import { Box } from "@mui/material";

const questionStyles = { marginTop: '20px', color: '#37a862', fontWeight: '800' }
const answerStyles = { margin: '10px 0px', color: '#484e53' }

export const headerModalData = {
    '1': {
        title: 'Your Questions, Our Answers—Contact Us!',
        content: () => (
            <Box>
                <Box sx={{ margin: '7px 0px' }}>
                    Have questions or need assistance? Reach out to us!
                </Box>
                <Box sx={{ margin: '15px 0px' }}>
                    <Box sx={{ fontWeight: 'bold' }}>Email:</Box>
                    <a href="mailto:nsdigitalaccount@savings.gov.pk" style={{ textDecoration: 'underline', color: '#37a862' }}>
                        nsdigitalaccount@savings.gov.pk
                    </a>
                </Box>

                <Box sx={{ margin: '15px 0px' }}>
                    <Box sx={{ fontWeight: 'bold' }}> Call us:</Box>

                    <a href="tel:+9251111267268" style={{ textDecoration: 'underline', color: '#37a862' }}>
                        051-111-267-268
                    </a>
                </Box>

                <Box sx={{ margin: '15px 0px' }}>
                    <Box sx={{ fontWeight: 'bold' }}>Visit our website:</Box>

                    <a
                        href="https://savings.gov.pk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', color: '#37a862' }}
                    >
                        https://savings.gov.pk/
                    </a>
                </Box>

                <Box sx={{ margin: '15px 0px' }}>
                    We're here to help!
                </Box>
            </Box>
        )
    },
    '2': {
        title: 'Frequently Asked Questions (FAQs) - Digital Account Opening',
        content: () => (
            <Box>
                <Box sx={questionStyles}>What is Digital Account Opening?</Box>
                <Box sx={answerStyles}>Digital Account Opening allows you to open a bank account online without needing to visit a physical branch. The entire process, including form submission, verification, and approval, is done digitally.</Box>

                <Box sx={questionStyles}>Who is eligible to open a digital account?</Box>
                <Box sx={answerStyles}>Individuals who meet the bank's eligibility criteria, such as being a resident or non-resident of the country, having a valid ID (like CNIC, NICOP, or passport), and being of legal age, can open a digital account.</Box>

                <Box sx={questionStyles}>What documents are required for digital account opening?</Box>
                <Box sx={answerStyles}>Typically, you will need a valid identification document (CNIC, NICOP, or passport), proof of address, and sometimes a recent photograph or selfie for verification. Specific document requirements may vary depending on the bank.</Box>

                <Box sx={questionStyles}>How long does it take to open a digital account?</Box>
                <Box sx={answerStyles}>The account opening process usually takes a few minutes to complete online. However, the verification process may take up to 1-2 business days, depending on the bank's procedures.</Box>

                <Box sx={questionStyles}>Is it safe to open a bank account digitally?</Box>
                <Box sx={answerStyles}>Yes, digital account opening is secure. Banks use encryption, secure authentication methods, and other security measures to protect your personal information.</Box>

                <Box sx={questionStyles}>Can I open different types of accounts digitally?</Box>
                <Box sx={answerStyles}>Yes, depending on the bank, you may be able to open different types of accounts such as savings accounts, current accounts, and even foreign currency accounts digitally.</Box>

                <Box sx={questionStyles}>Do I need to visit the bank at any point during the digital account opening process?</Box>
                <Box sx={answerStyles}>In most cases, the entire process can be completed online without the need for a branch visit. However, some banks may require a branch visit for additional verification or document submission.</Box>

                <Box sx={questionStyles}>Can I deposit and withdraw money after opening a digital account?</Box>
                <Box sx={answerStyles}>Yes, once your digital account is active, you can deposit and withdraw money through online banking, mobile apps, or ATMs, depending on the services offered by the bank.</Box>

                <Box sx={questionStyles}>How will I receive my account details and debit card?</Box>
                <Box sx={answerStyles}>After your digital account is successfully opened, you will receive your account details via email or SMS. The debit card, if applicable, will be mailed to your registered address.</Box>

                <Box sx={questionStyles}>What should I do if I encounter issues during the digital account opening process?</Box>
                <Box sx={answerStyles}>If you face any issues, you can contact the bank’s customer support via their helpline, email, or live chat for assistance.</Box>

                <Box sx={questionStyles}>Which currencies are available for onboarding through Bank of Khyber Digital Banking?</Box>
                <Box sx={answerStyles}>At present, Digital Account Opening is only offering Pakistani Rupee (PKR) Accounts.</Box>

                <Box sx={questionStyles}>Can a customer apply for multiple Digital Accounts?</Box>
                <Box sx={answerStyles}>Customers can only apply for multiple Digital Accounts with different account types.</Box>
            </Box>
        )
    },
    '3': {
        title: 'Check Your Eligibility!',
        content: () => (
            <Box>
                <ol>
                    <li style={{ marginBottom: '10px' }}>Applicants must be 18 years of age or older.</li>

                    <li style={{ marginBottom: '10px' }}>Only individual customers are eligible to complete their own application forms.</li>

                    <li style={{ marginBottom: '10px' }}>Both Pakistani and non-Pakistani residents are eligible
                        to apply.</li>

                    <li style={{ marginBottom: '10px' }}>Applicants must possess a valid CNIC and provide proof of income.</li>
                </ol>
            </Box>
        )
    },
} 