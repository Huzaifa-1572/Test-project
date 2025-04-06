export const PayvayTerms = [
    {
        title: "About Payvay",
        content: "Payvay is a product of CERISMA (Private) Limited, licensed in principle by the State Bank of Pakistan (SBP) as an Electronic Money Institution (EMI) under the EMI Regulations."
    },
    {
        title: "Scope",
        content: "These Terms of Use govern the registration, use, and closure of your Payvay Account, along with the associated Services available on the Payvay Platform. These Terms, together with our Policies and any referenced conditions, constitute a binding agreement between you and Payvay. The latest Terms can always be accessed on our website or the Payvay Platform."
    },
    {
        title: "Payvay Account",
        content: () => {
            return (
                <>
                    <strong>Opening an Account</strong>
                    <p>To use our Services, you must register for a Payvay Account, providing accurate and up-to-date
                        information. You must be at least eighteen (18) years old with legal capacity to accept these Terms.</p>
                    <strong>Ownership and Usage</strong>
                    <p>Your Payvay Account holds E-Money, enabling you to access Payment Services. Your account remains
                        denominated in Pakistani Rupees (PKR). The E-Money stored in your account:</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Does not expire but earns no interest, mark-up, or other return.</li>
                        <li>Is not a deposit or a bank account.</li>
                        <li>Is always backed by funds held in a trust account, separate from Payvay's own funds, in
                            compliance with EMI Regulations.</li>
                        <li>Is strictly personal and cannot be transferred or assigned to third parties.
                        </li>
                    </ul>
                    <strong>Account Security</strong>
                    <p>You must keep your Payvay Password, PIN, and other security credentials confidential. If you suspect
                        unauthorized access, you must immediately notify Customer Service and change your credentials.
                        Payvay reserves the right to suspend your account for security reasons. Also, Payvay is not responsible
                        for any misuse caused by sharing the Password, OTP, PIN, and other security credentials to anyone.
                    </p>
                </>
            )
        }
    },
    {
        title: "Account Maintenance",
        content: () => (
            <>
                <p>You must keep your account information accurate and up to date. Payvay may request additional verification at any time.</p>
                <p>You are permitted to add and use only those Load Methods that are registered in your name. Any attempt to link or utilize third-party accounts without explicit authorization may be considered a violation of these Terms and could be treated as fraudulent activity.</p>
                <p>Transactions are recorded in your account history. You should review them regularly and report discrepancies within three (3) months. Payvay will not entertain any discrepancy reported after 3 months.</p>
            </>
        )
    },
    {
        title: "Security and Safety",
        content: "You must protect your account credentials and devices against unauthorized access. If Payvay suspects fraud or a security breach, we may contact you and take necessary actions, including temporary suspension. You should use strong, unique passwords and update them periodically"
    },
    {
        title: "Account Closure",
        content: () => {
            return (
                <>
                    <strong>By User</strong>
                    <p>You may close your account by contacting Customer Service. Any remaining balance must be
                        withdrawn within a reasonable timeframe</p>
                    <strong>By Payvay</strong>
                    <p>We may suspend or terminate your account for any of the following reasons:</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Violation of these Terms or Applicable Laws.</li>
                        <li>Fraud, money laundering, or unauthorized activity</li>
                        <li>By order of a Competent Authority.</li>
                        <li>Prolonged inactivity or non-compliance with verification requirements.</li>
                    </ul>
                    <p>In case of the user's death, Payvay will transfer the account balance to legal heirs upon receipt of a
                        valid succession certificate</p>
                </>
            )
        }
    },
    {
        title: "Loading and Withdrawing E-Money",
        content: () => (
            <>
                <p>Payvay offers multiple Load and Withdrawal Methods, which may change at our discretion.</p>
                <p>E-Money is credited once we or a Partner Institution receive the corresponding funds.</p>
                <p>Withdrawal requests may be subject to security checks and Applicable Laws.</p>
            </>
        )
    },
    {
        title: "Fees and Limits",
        content: "Fees are detailed in the 'Fees' section of the Payvay Platform and may be updated periodically. Transaction limits are dynamically adjusted based on verification status and regulatory requirements. Insufficient balance may result in service restrictions."
    },
    {
        title: "Partner Institutions",
        content: "Payvay collaborates with regulated financial institutions to provide services. Users must comply with Partner Institutions' policies regarding linked accounts"
    },
    {
        title: "Data Privacy",
        content: "Payvay collects and processes user data in accordance with its Privacy Policy. We may access your device for service optimization, fraud prevention, and regulatory compliance. Users can withdraw data processing consent by closing their account"
    },
    {
        title: "Intellectual Property",
        content: "All Payvay Platform content, including logos, trademarks, and designs, are owned by Payvay. Users must not modify, reproduce, or distribute Payvay's intellectual property without permission."
    },
    {
        title: "Liability and Indemnity",
        content: "Payvay is not liable for unauthorized transactions resulting from user negligence. Users must dispute unauthorized transactions within three (3) months. Payvay is not responsible for third-party services, partner institution policies, or external payment failures. Users agree to indemnify Payvay against claims arising from violations of these Terms or applicable laws."
    },
    {
        title: "Termination and Suspension",
        content: "Payvay may suspend, restrict, or terminate accounts for non-compliance, security concerns, or regulatory reasons. Payvay may amend these Terms with prior notice."
    },
    {
        title: "Communications",
        content: () => {
            return (
                <>
                    <p>Payvay will communicate via in-app notifications, SMS, or email. Users must check messages
                        periodically to stay updated.</p>
                    <p>Official customer support is available via:</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Email: support@payvay.com</li>
                        <li>Customer Service Helpline</li>
                        <li>Payvay Platform</li>
                    </ul>
                </>
            )
        }
    },
    {
        title: "Disputes and Complaints",
        content: "Users can raise disputes via the Payvay Complaint Handling Mechanism. Payvay will acknowledge complaints within 48 hours and strive to resolve them promptly. Disputes will be governed under Pakistani laws, with exclusive jurisdiction in Karachi courts."
    },
    {
        title: "General Provisions",
        content: () => (
            <>
                <p>These Terms are governed by the laws of Pakistan.</p>
                <p>If any provision is deemed invalid, the rest of the Terms remain enforceable.</p>
                <p>Users may not assign their rights under these Terms.</p>
            </>
        )
    },
    {
        title: "Permitted Usage of Chat Service",
        content: () => {
            return (
                <>
                    <p>Users may only use the Chat Service for purposes permitted under the Terms of Use, these Chat T&Cs,
                        and Applicable Laws. Any breach of these terms may lead to immediate suspension or termination of
                        access and may be reported to relevant authorities if necessary.
                    </p>
                    <strong>Prohibited Uses</strong>
                    <p>You agree not to use or assist others in using the Chat Service for activities that:</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Infringe on privacy, intellectual property, or other proprietary rights.</li>
                        <li>Promote illegal, obscene, defamatory, threatening, or hateful content</li>
                        <li>Disseminate false, misleading, or impersonated information.</li>
                        <li>Engage in spam, bulk messaging, or automated messaging.</li>
                        <li>Violate national security or public safety norms.</li>
                        <li>Are non-personal in nature unless explicitly authorized by Payvay.</li>
                    </ul>
                    <p>Payvay reserves the right to remove, suspend, or restrict access to any content that violates these
                        terms or is flagged by a competent authority.</p>
                </>
            )
        }
    },
    {
        title: "User Responsibilities and Security",
        content: () => {
            return (
                <>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Users are responsible for securing their devices, credentials, and Payvay accounts.</li>
                        <li>Unauthorized use or suspected security breaches must be reported immediately.</li>
                        <li>Interactions with third-party websites or apps through Payvay Chat are governed by the
                            respective third-party terms and policies.</li>
                    </ul>
                </>
            )
        }
    },
    {
        title: "Access and Service Interruptions",
        content: () => {
            return (
                <>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Chat Services may experience downtime due to maintenance, upgrades, or unforeseen circumstances.</li>
                        <li>Payvay reserves the right to modify, suspend, or terminate access to Chat Services without prior notice in case of breaches, security threats, or legal obligations.</li>
                        <li>The Chat Service does not provide emergency call or messaging capabilities.</li>
                    </ul>
                </>
            )
        }
    },
    {
        title: "Complaints and Dispute Resolution",
        content: () => {
            return (
                <>
                    <p>Users may lodge complaints via:</p>
                    <p>1. Payvay Customer Service Helpline: 021-111-111-776.</p>
                    <p>2. In-app Dispute Resolution Center:</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Step 1: Tap 'Dispute Resolution' in the menu.</li>
                        <li>Step 2: Select dispute type</li>
                        <li>Step 3: Upload supporting evidence</li>
                        <li>Step 4: Provide a detailed description.</li>
                        <li>Step 5: Track dispute status via the app.</li>
                    </ul>
                </>
            )
        }
    },
    {
        title: "Data Privacy and Security",
        content: () => {
            return (
                <>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Payvay adheres to strict privacy policies in compliance with EMI Regulations and the
                            Protection of Electronic Crimes Act, 2016.</li>
                        <li>Messages are stored only on user devices and are deleted from servers once delivered, except
                            for group chats</li>
                        <li>Users may opt out of data processing by discontinuing Chat Services.</li>
                    </ul>
                </>
            )
        }
    },
    {
        title: "Changes to Terms",
        content: () => {
            return (
                <>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                        <li>Payvay may modify these Chat T&Cs at its discretion.</li>
                        <li>Users will be notified of significant changes via the Payvay Platform.</li>
                        <li>Continued use of Chat Services constitutes acceptance of the revised terms.</li>
                    </ul>
                </>
            )
        }
    },
    {
        title: "Governing Law",
        content: () => (
            <>
                <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes
                    shall be subject to the exclusive jurisdiction of the courts in Karachi.</p>
                <p>By using Payvay, you confirm that you have read, understood, and agreed to these Terms of Use.
                    Continued use of Payvay constitutes ongoing acceptance of the Terms and any modifications thereof.</p>
            </>
        )
    },
]