# Oddsgraph Pages and Screens Documentation

## 1. Authentication Pages

### Login Page
**Purpose:** User authentication entry point for existing users

#### Components
1. Input Fields:
   - Email address (required)
   - Password (required)

2. Action Elements:
   - "Log In" submit button
   - "Forgot Password" link
   - "Register" link for new users

#### Functionality
- Form validation for required fields
- Secure credential authentication
- Redirect to Home Page upon successful login
- Error handling for invalid credentials

### Registration Page
**Purpose:** New user account creation

#### Components
1. Input Fields:
   - Full name (required)
   - Email address (required)
   - Password (required)
   - Password confirmation (required)

2. Action Elements:
   - Terms of Service checkbox
   - Privacy Policy checkbox
   - "Create Account" submit button
   - "Login" link for existing users

#### Functionality
- Email validation
- Password strength requirements
- Terms acceptance verification
- Account creation confirmation

### Password Recovery Page
**Purpose:** Assist users in password reset process

#### Components
1. Input Fields:
   - Email address (required)

2. Action Elements:
   - "Reset Password" submit button
   - Recovery instructions

#### Functionality
- Email validation
- Recovery link generation
- Email delivery confirmation
- Password reset workflow

## 2. Main Application Pages

### Home Page
**Purpose:** Primary platform entry point and game overview

#### Components
1. Header Section:
   - Platform logo
   - Navigation menu
   - User account access

2. Search and Filter Section:
   - Search bar for games/teams/players
   - Status filters:
     - Live games
     - Upcoming games
     - Completed games

3. Game List Section:
   - Game cards displaying:
     - Teams
     - Date/time
     - Current status
     - Basic odds information

4. Platform Introduction:
   - Feature highlights
   - "Getting Started" guidance
   - Featured content section

#### Functionality
- Real-time game updates
- Dynamic search filtering
- Direct navigation to Game Detail Pages
- Responsive layout adaptation

### Game Detail Page
**Purpose:** Comprehensive game analysis and betting insights

#### Components
1. Header Information:
   - Team names
   - Game date/time
   - Current status
   - Basic game stats

2. Live Data Section:
   - Real-time scores
   - Current statistics
   - Data source: NBA/NCAAAB API

3. Odds Analysis Section:
   - Current betting odds (ODDS-API)
   - Multiple sportsbook comparisons
   - Interactive odds movement graph
   - Event-based node markers

4. Injury Reports:
   - Player status updates
   - Source: NBA Injury Data API
   - Historical injury context

5. AI Insights Section:
   - Generated narratives (xAI Grok Models)
   - Odds movement explanations
   - Trend analysis
   - Market sentiment summary

6. Historical Analysis:
   - Similar game comparisons
   - Historical outcomes
   - Betting trend analysis
   - Source: NBA Backtest/Basketball Head API

7. Social Media Integration:
   - Filtered tweets from:
     - @FantasyLabsNBA
     - @LineStarApp
     - @Underdog__NBA

#### Functionality
- Real-time data updates
- Interactive visualization controls
- Dynamic narrative generation
- Social media feed refresh

## 3. User Management Pages

### Subscription Page
**Purpose:** Plan selection and subscription management

#### Components
1. Plan Options:
   - Basic Plan ($0.00/month):
     - Limited data access
     - Basic features list
   - Pro Plan ($9.99/month):
     - Full data access
     - Complete feature list

2. Comparison Table:
   - Feature breakdown
   - Access levels
   - Usage limits

3. Action Buttons:
   - Subscribe/Upgrade
   - Downgrade
   - Cancel subscription

#### Functionality
- Plan comparison
- Subscription processing
- Payment integration
- Plan switching logic

### Profile Page
**Purpose:** User information management

#### Components
1. Personal Information:
   - Name
   - Email
   - Account details

2. Subscription Details:
   - Current plan
   - Renewal date
   - Billing information

3. Edit Controls:
   - Update profile
   - Change password
   - Modify email

### Settings Page
**Purpose:** Platform customization and preferences

#### Components
1. Notification Preferences:
   - Email alerts
   - Push notifications
   - Update frequency

2. Privacy Settings:
   - Data sharing options
   - Analytics participation

3. Account Management:
   - Deletion options
   - Data export

## 4. Support Pages

### Help/Documentation Page
**Purpose:** User guidance and resource center

#### Components
1. FAQ Section:
   - Common questions
   - Platform usage guides
   - Feature explanations

2. Tutorial Content:
   - Getting started guide
   - Feature walkthroughs
   - Video tutorials

3. Technical Documentation:
   - API integration details
   - Data source information

### Contact/Support Page
**Purpose:** User assistance and feedback

#### Components
1. Contact Form:
   - Name field
   - Email field
   - Subject selection
   - Message area

2. Support Options:
   - Email contact
   - Live chat (if available)
   - Response time expectations

## 5. Legal Pages

### Terms of Service Page
**Purpose:** Legal framework and usage terms

#### Components
- Platform usage rules
- User responsibilities
- Liability terms
- Service conditions
- Update procedures

### Privacy Policy Page
**Purpose:** Data handling and privacy practices

#### Components
- Data collection policies
- Usage practices
- User rights
- GDPR compliance
- Cookie policies