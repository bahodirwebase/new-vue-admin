<template>
  <div class="form-wizard-demo">
    <n-space vertical :size="24">
      <!-- Simple Wizard Selection -->
      <n-card title="Choose Wizard Type">
        <n-space vertical :size="16">
          <n-radio-group v-model:value="selectedWizard" size="large">
            <n-space vertical :size="12">
              <n-radio value="simple">
                <div>
                  <div style="font-weight: 600">Simple Registration (3 Steps)</div>
                  <div style="font-size: 12px; color: var(--text-secondary)">
                    Basic user registration with name, email, and preferences
                  </div>
                </div>
              </n-radio>
              <n-radio value="medium">
                <div>
                  <div style="font-weight: 600">Job Application (4 Steps)</div>
                  <div style="font-size: 12px; color: var(--text-secondary)">
                    Complete job application form with professional details
                  </div>
                </div>
              </n-radio>
              <n-radio value="comprehensive">
                <div>
                  <div style="font-weight: 600">Comprehensive Application (5 Steps)</div>
                  <div style="font-size: 12px; color: var(--text-secondary)">
                    Full application with all details and document upload
                  </div>
                </div>
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-space>
      </n-card>

      <!-- Simple Wizard -->
      <n-card v-if="selectedWizard === 'simple'" title="Simple Registration Wizard">
        <n-steps :current="simpleCurrentStep" :status="simpleStepStatus" size="small">
          <n-step title="Account" description="Basic info" />
          <n-step title="Profile" description="Personal details" />
          <n-step title="Preferences" description="Settings" />
        </n-steps>

        <div class="wizard-content">
          <!-- Simple Step 1: Account -->
          <div v-if="simpleCurrentStep === 1" class="step-content">
            <h3>Create Account</h3>
            <n-form
              ref="simpleAccountFormRef"
              :model="simpleWizardData.account"
              :rules="simpleAccountRules"
              label-placement="left"
              label-width="100"
            >
              <n-form-item label="Username" path="username">
                <n-input
                  v-model:value="simpleWizardData.account.username"
                  placeholder="Choose a username"
                />
              </n-form-item>
              <n-form-item label="Email" path="email">
                <n-input
                  v-model:value="simpleWizardData.account.email"
                  placeholder="Enter your email"
                />
              </n-form-item>
              <n-form-item label="Password" path="password">
                <n-input
                  v-model:value="simpleWizardData.account.password"
                  type="password"
                  placeholder="Create a password"
                  show-password-on="click"
                />
              </n-form-item>
            </n-form>
          </div>

          <!-- Simple Step 2: Profile -->
          <div v-if="simpleCurrentStep === 2" class="step-content">
            <h3>Profile Information</h3>
            <n-form
              ref="simpleProfileFormRef"
              :model="simpleWizardData.profile"
              :rules="simpleProfileRules"
              label-placement="left"
              label-width="100"
            >
              <n-form-item label="Full Name" path="fullName">
                <n-input
                  v-model:value="simpleWizardData.profile.fullName"
                  placeholder="Enter your full name"
                />
              </n-form-item>
              <n-form-item label="Age" path="age">
                <n-input-number
                  v-model:value="simpleWizardData.profile.age"
                  placeholder="Your age"
                  :min="18"
                  :max="100"
                />
              </n-form-item>
              <n-form-item label="Country" path="country">
                <n-select
                  v-model:value="simpleWizardData.profile.country"
                  placeholder="Select your country"
                  :options="simpleCountryOptions"
                />
              </n-form-item>
            </n-form>
          </div>

          <!-- Simple Step 3: Preferences -->
          <div v-if="simpleCurrentStep === 3" class="step-content">
            <h3>Preferences</h3>
            <n-form
              ref="simplePreferencesFormRef"
              :model="simpleWizardData.preferences"
              :rules="simplePreferencesRules"
              label-placement="left"
              label-width="100"
            >
              <n-form-item label="Interests" path="interests">
                <n-checkbox-group v-model:value="simpleWizardData.preferences.interests">
                  <n-space>
                    <n-checkbox value="sports">Sports</n-checkbox>
                    <n-checkbox value="music">Music</n-checkbox>
                    <n-checkbox value="movies">Movies</n-checkbox>
                    <n-checkbox value="reading">Reading</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>
              <n-form-item label="Newsletter" path="newsletter">
                <n-switch v-model:value="simpleWizardData.preferences.newsletter">
                  <template #checked>Subscribe</template>
                  <template #unchecked>Don't subscribe</template>
                </n-switch>
              </n-form-item>
              <n-form-item label="Theme" path="theme">
                <n-radio-group v-model:value="simpleWizardData.preferences.theme">
                  <n-radio value="light">Light</n-radio>
                  <n-radio value="dark">Dark</n-radio>
                  <n-radio value="auto">Auto</n-radio>
                </n-radio-group>
              </n-form-item>
            </n-form>
          </div>
        </div>

        <!-- Simple Wizard Navigation -->
        <div class="wizard-navigation">
          <n-space justify="space-between">
            <n-button
              v-if="simpleCurrentStep > 1"
              @click="simplePreviousStep"
            >
              <template #icon>
                <n-icon :component="ChevronBackOutline" />
              </template>
              Previous
            </n-button>
            <div v-else></div>

            <n-space>
              <n-button
                v-if="simpleCurrentStep < 3"
                type="primary"
                @click="simpleNextStep"
              >
                Next
                <template #icon>
                  <n-icon :component="ChevronForwardOutline" />
                </template>
              </n-button>
              <n-button
                v-if="simpleCurrentStep === 3"
                type="primary"
                @click="submitSimpleWizard"
              >
                <template #icon>
                  <n-icon :component="CheckmarkOutline" />
                </template>
                Register
              </n-button>
            </n-space>
          </n-space>
        </div>
      </n-card>

      <!-- Medium Wizard -->
      <n-card v-if="selectedWizard === 'medium'" title="Job Application Wizard">
        <n-steps :current="mediumCurrentStep" :status="mediumStepStatus" size="medium">
          <n-step title="Personal" description="Basic information" />
          <n-step title="Experience" description="Work background" />
          <n-step title="Skills" description="Technical skills" />
          <n-step title="Review" description="Review application" />
        </n-steps>

        <div class="wizard-content">
          <!-- Medium Step 1: Personal -->
          <div v-if="mediumCurrentStep === 1" class="step-content">
            <h3>Personal Information</h3>
            <n-form
              ref="mediumPersonalFormRef"
              :model="mediumWizardData.personal"
              :rules="mediumPersonalRules"
              label-placement="left"
              label-width="120"
            >
              <n-grid :cols="2" :x-gap="16">
                <n-grid-item>
                  <n-form-item label="First Name" path="firstName">
                    <n-input
                      v-model:value="mediumWizardData.personal.firstName"
                      placeholder="First name"
                    />
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="Last Name" path="lastName">
                    <n-input
                      v-model:value="mediumWizardData.personal.lastName"
                      placeholder="Last name"
                    />
                  </n-form-item>
                </n-grid-item>
              </n-grid>

              <n-form-item label="Email" path="email">
                <n-input
                  v-model:value="mediumWizardData.personal.email"
                  placeholder="Email address"
                />
              </n-form-item>

              <n-form-item label="Phone" path="phone">
                <n-input
                  v-model:value="mediumWizardData.personal.phone"
                  placeholder="Phone number"
                />
              </n-form-item>

              <n-form-item label="Location" path="location">
                <n-input
                  v-model:value="mediumWizardData.personal.location"
                  placeholder="City, Country"
                />
              </n-form-item>
            </n-form>
          </div>

          <!-- Medium Step 2: Experience -->
          <div v-if="mediumCurrentStep === 2" class="step-content">
            <h3>Work Experience</h3>
            <n-form
              ref="mediumExperienceFormRef"
              :model="mediumWizardData.experience"
              :rules="mediumExperienceRules"
              label-placement="left"
              label-width="120"
            >
              <n-form-item label="Current Company" path="currentCompany">
                <n-input
                  v-model:value="mediumWizardData.experience.currentCompany"
                  placeholder="Current company"
                />
              </n-form-item>

              <n-form-item label="Job Title" path="jobTitle">
                <n-input
                  v-model:value="mediumWizardData.experience.jobTitle"
                  placeholder="Current job title"
                />
              </n-form-item>

              <n-form-item label="Years of Experience" path="yearsExperience">
                <n-select
                  v-model:value="mediumWizardData.experience.yearsExperience"
                  placeholder="Select experience"
                  :options="experienceOptions"
                />
              </n-form-item>

              <n-form-item label="Previous Company" path="previousCompany">
                <n-input
                  v-model:value="mediumWizardData.experience.previousCompany"
                  placeholder="Previous company (optional)"
                />
              </n-form-item>

              <n-form-item label="Education" path="education">
                <n-select
                  v-model:value="mediumWizardData.experience.education"
                  placeholder="Highest education"
                  :options="educationOptions"
                />
              </n-form-item>
            </n-form>
          </div>

          <!-- Medium Step 3: Skills -->
          <div v-if="mediumCurrentStep === 3" class="step-content">
            <h3>Technical Skills</h3>
            <n-form
              ref="mediumSkillsFormRef"
              :model="mediumWizardData.skills"
              :rules="mediumSkillsRules"
              label-placement="left"
              label-width="120"
            >
              <n-form-item label="Programming Languages" path="languages">
                <n-checkbox-group v-model:value="mediumWizardData.skills.languages">
                  <n-space>
                    <n-checkbox value="javascript">JavaScript</n-checkbox>
                    <n-checkbox value="python">Python</n-checkbox>
                    <n-checkbox value="java">Java</n-checkbox>
                    <n-checkbox value="csharp">C#</n-checkbox>
                    <n-checkbox value="php">PHP</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>

              <n-form-item label="Frameworks" path="frameworks">
                <n-checkbox-group v-model:value="mediumWizardData.skills.frameworks">
                  <n-space>
                    <n-checkbox value="react">React</n-checkbox>
                    <n-checkbox value="vue">Vue.js</n-checkbox>
                    <n-checkbox value="angular">Angular</n-checkbox>
                    <n-checkbox value="django">Django</n-checkbox>
                    <n-checkbox value="laravel">Laravel</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>

              <n-form-item label="Experience Level" path="experienceLevel">
                <n-radio-group v-model:value="mediumWizardData.skills.experienceLevel">
                  <n-radio value="junior">Junior</n-radio>
                  <n-radio value="mid">Mid-level</n-radio>
                  <n-radio value="senior">Senior</n-radio>
                  <n-radio value="lead">Lead</n-radio>
                </n-radio-group>
              </n-form-item>

              <n-form-item label="Salary Expectation" path="salary">
                <n-slider
                  v-model:value="mediumWizardData.skills.salary"
                  :min="30000"
                  :max="150000"
                  :step="5000"
                  :marks="mediumSalaryMarks"
                />
              </n-form-item>
            </n-form>
          </div>

          <!-- Medium Step 4: Review -->
          <div v-if="mediumCurrentStep === 4" class="step-content">
            <h3>Review Application</h3>
            <n-descriptions :column="2" bordered>
              <n-descriptions-item label="Name">
                {{ mediumWizardData.personal.firstName }} {{ mediumWizardData.personal.lastName }}
              </n-descriptions-item>
              <n-descriptions-item label="Email">
                {{ mediumWizardData.personal.email }}
              </n-descriptions-item>
              <n-descriptions-item label="Phone">
                {{ mediumWizardData.personal.phone }}
              </n-descriptions-item>
              <n-descriptions-item label="Location">
                {{ mediumWizardData.personal.location }}
              </n-descriptions-item>
              <n-descriptions-item label="Current Company">
                {{ mediumWizardData.experience.currentCompany }}
              </n-descriptions-item>
              <n-descriptions-item label="Job Title">
                {{ mediumWizardData.experience.jobTitle }}
              </n-descriptions-item>
              <n-descriptions-item label="Experience">
                {{ mediumWizardData.experience.yearsExperience }}
              </n-descriptions-item>
              <n-descriptions-item label="Education">
                {{ mediumWizardData.experience.education }}
              </n-descriptions-item>
              <n-descriptions-item label="Languages">
                {{ mediumWizardData.skills.languages.join(', ') }}
              </n-descriptions-item>
              <n-descriptions-item label="Frameworks">
                {{ mediumWizardData.skills.frameworks.join(', ') }}
              </n-descriptions-item>
              <n-descriptions-item label="Level">
                {{ mediumWizardData.skills.experienceLevel }}
              </n-descriptions-item>
              <n-descriptions-item label="Salary">
                ${{ mediumWizardData.skills.salary.toLocaleString() }}
              </n-descriptions-item>
            </n-descriptions>
          </div>
        </div>

        <!-- Medium Wizard Navigation -->
        <div class="wizard-navigation">
          <n-space justify="space-between">
            <n-button
              v-if="mediumCurrentStep > 1"
              @click="mediumPreviousStep"
            >
              <template #icon>
                <n-icon :component="ChevronBackOutline" />
              </template>
              Previous
            </n-button>
            <div v-else></div>

            <n-space>
              <n-button
                v-if="mediumCurrentStep < 4"
                type="primary"
                @click="mediumNextStep"
              >
                Next
                <template #icon>
                  <n-icon :component="ChevronForwardOutline" />
                </template>
              </n-button>
              <n-button
                v-if="mediumCurrentStep === 4"
                type="primary"
                @click="submitMediumWizard"
              >
                <template #icon>
                  <n-icon :component="CheckmarkOutline" />
                </template>
                Submit Application
              </n-button>
            </n-space>
          </n-space>
        </div>
      </n-card>

      <!-- Comprehensive Wizard -->
      <n-card v-if="selectedWizard === 'comprehensive'" title="Comprehensive Application Wizard">
        <n-steps :current="currentStep" :status="stepStatus" size="medium">
          <n-step
            v-for="(step, index) in steps"
            :key="index"
            :title="step.title"
            :description="step.description"
          />
        </n-steps>

        <div class="wizard-content">
          <div v-if="currentStep === 1" class="step-content">
            <h3>Personal Information</h3>
            <n-form
              ref="personalFormRef"
              :model="wizardData.personal"
              :rules="personalRules"
              label-placement="left"
              label-width="120"
            >
              <n-grid :cols="2" :x-gap="16">
                <n-grid-item>
                  <n-form-item label="First Name" path="firstName">
                    <n-input
                      v-model:value="wizardData.personal.firstName"
                      placeholder="Enter first name"
                    />
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="Last Name" path="lastName">
                    <n-input
                      v-model:value="wizardData.personal.lastName"
                      placeholder="Enter last name"
                    />
                  </n-form-item>
                </n-grid-item>
              </n-grid>

              <n-form-item label="Email" path="email">
                <n-input
                  v-model:value="wizardData.personal.email"
                  placeholder="Enter email address"
                />
              </n-form-item>

              <n-form-item label="Phone" path="phone">
                <n-input
                  v-model:value="wizardData.personal.phone"
                  placeholder="Enter phone number"
                />
              </n-form-item>

              <n-form-item label="Date of Birth" path="dob">
                <n-date-picker
                  v-model:value="wizardData.personal.dob"
                  type="date"
                  placeholder="Select birth date"
                />
              </n-form-item>

              <n-form-item label="Gender" path="gender">
                <n-radio-group v-model:value="wizardData.personal.gender">
                  <n-radio value="male">Male</n-radio>
                  <n-radio value="female">Female</n-radio>
                  <n-radio value="other">Other</n-radio>
                </n-radio-group>
              </n-form-item>
            </n-form>
          </div>

          <!-- Step 2: Address Information -->
          <div v-if="currentStep === 2" class="step-content">
            <h3>Address Information</h3>
            <n-form
              ref="addressFormRef"
              :model="wizardData.address"
              :rules="addressRules"
              label-placement="left"
              label-width="120"
            >
              <n-form-item label="Street Address" path="street">
                <n-input
                  v-model:value="wizardData.address.street"
                  placeholder="Enter street address"
                />
              </n-form-item>

              <n-grid :cols="2" :x-gap="16">
                <n-grid-item>
                  <n-form-item label="City" path="city">
                    <n-input
                      v-model:value="wizardData.address.city"
                      placeholder="Enter city"
                    />
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="State/Province" path="state">
                    <n-input
                      v-model:value="wizardData.address.state"
                      placeholder="Enter state/province"
                    />
                  </n-form-item>
                </n-grid-item>
              </n-grid>

              <n-grid :cols="2" :x-gap="16">
                <n-grid-item>
                  <n-form-item label="Postal Code" path="postalCode">
                    <n-input
                      v-model:value="wizardData.address.postalCode"
                      placeholder="Enter postal code"
                    />
                  </n-form-item>
                </n-grid-item>
                <n-grid-item>
                  <n-form-item label="Country" path="country">
                    <n-select
                      v-model:value="wizardData.address.country"
                      placeholder="Select country"
                      :options="countryOptions"
                    />
                  </n-form-item>
                </n-grid-item>
              </n-grid>

              <n-form-item label="Address Type" path="addressType">
                <n-radio-group v-model:value="wizardData.address.addressType">
                  <n-radio value="home">Home</n-radio>
                  <n-radio value="work">Work</n-radio>
                  <n-radio value="other">Other</n-radio>
                </n-radio-group>
              </n-form-item>
            </n-form>
          </div>

          <!-- Step 3: Professional Information -->
          <div v-if="currentStep === 3" class="step-content">
            <h3>Professional Information</h3>
            <n-form
              ref="professionalFormRef"
              :model="wizardData.professional"
              :rules="professionalRules"
              label-placement="left"
              label-width="120"
            >
              <n-form-item label="Company" path="company">
                <n-input
                  v-model:value="wizardData.professional.company"
                  placeholder="Enter company name"
                />
              </n-form-item>

              <n-form-item label="Job Title" path="jobTitle">
                <n-input
                  v-model:value="wizardData.professional.jobTitle"
                  placeholder="Enter job title"
                />
              </n-form-item>

              <n-form-item label="Department" path="department">
                <n-select
                  v-model:value="wizardData.professional.department"
                  placeholder="Select department"
                  :options="departmentOptions"
                />
              </n-form-item>

              <n-form-item label="Experience" path="experience">
                <n-select
                  v-model:value="wizardData.professional.experience"
                  placeholder="Select years of experience"
                  :options="experienceOptions"
                />
              </n-form-item>

              <n-form-item label="Skills" path="skills">
                <n-checkbox-group v-model:value="wizardData.professional.skills">
                  <n-space>
                    <n-checkbox value="javascript">JavaScript</n-checkbox>
                    <n-checkbox value="python">Python</n-checkbox>
                    <n-checkbox value="java">Java</n-checkbox>
                    <n-checkbox value="csharp">C#</n-checkbox>
                    <n-checkbox value="react">React</n-checkbox>
                    <n-checkbox value="vue">Vue.js</n-checkbox>
                    <n-checkbox value="angular">Angular</n-checkbox>
                    <n-checkbox value="nodejs">Node.js</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>

              <n-form-item label="Salary Expectation" path="salary">
                <n-slider
                  v-model:value="wizardData.professional.salary"
                  :min="30000"
                  :max="200000"
                  :step="5000"
                  :marks="salaryMarks"
                />
              </n-form-item>
            </n-form>
          </div>

          <!-- Step 4: Additional Information -->
          <div v-if="currentStep === 4" class="step-content">
            <h3>Additional Information</h3>
            <n-form
              ref="additionalFormRef"
              :model="wizardData.additional"
              :rules="additionalRules"
              label-placement="left"
              label-width="120"
            >
              <n-form-item label="Bio" path="bio">
                <n-input
                  v-model:value="wizardData.additional.bio"
                  type="textarea"
                  placeholder="Tell us about yourself"
                  :rows="4"
                />
              </n-form-item>

              <n-form-item label="Hobbies" path="hobbies">
                <n-dynamic-tags v-model:value="wizardData.additional.hobbies" />
              </n-form-item>

              <n-form-item label="Languages" path="languages">
                <n-checkbox-group v-model:value="wizardData.additional.languages">
                  <n-space>
                    <n-checkbox value="english">English</n-checkbox>
                    <n-checkbox value="spanish">Spanish</n-checkbox>
                    <n-checkbox value="french">French</n-checkbox>
                    <n-checkbox value="german">German</n-checkbox>
                    <n-checkbox value="chinese">Chinese</n-checkbox>
                    <n-checkbox value="japanese">Japanese</n-checkbox>
                  </n-space>
                </n-checkbox-group>
              </n-form-item>

              <n-form-item label="Work Preference" path="workPreference">
                <n-radio-group v-model:value="wizardData.additional.workPreference">
                  <n-radio value="remote">Remote</n-radio>
                  <n-radio value="office">Office</n-radio>
                  <n-radio value="hybrid">Hybrid</n-radio>
                </n-radio-group>
              </n-form-item>

              <n-form-item label="Available Start Date" path="startDate">
                <n-date-picker
                  v-model:value="wizardData.additional.startDate"
                  type="date"
                  placeholder="Select available start date"
                />
              </n-form-item>

              <n-form-item label="Resume" path="resume">
                <n-upload
                  v-model:file-list="wizardData.additional.resume"
                  :max="1"
                  accept=".pdf,.doc,.docx"
                >
                  <n-button>Upload Resume</n-button>
                </n-upload>
              </n-form-item>
            </n-form>
          </div>

          <!-- Step 5: Review & Submit -->
          <div v-if="currentStep === 5" class="step-content">
            <h3>Review Your Information</h3>
            <n-space vertical :size="16">
              <n-collapse>
                <n-collapse-item title="Personal Information" name="personal">
                  <n-descriptions :column="2" bordered>
                    <n-descriptions-item label="Name">
                      {{ wizardData.personal.firstName }} {{ wizardData.personal.lastName }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Email">
                      {{ wizardData.personal.email }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Phone">
                      {{ wizardData.personal.phone }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Date of Birth">
                      {{ formatDate(wizardData.personal.dob) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Gender">
                      {{ wizardData.personal.gender }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-collapse-item>

                <n-collapse-item title="Address Information" name="address">
                  <n-descriptions :column="2" bordered>
                    <n-descriptions-item label="Street">
                      {{ wizardData.address.street }}
                    </n-descriptions-item>
                    <n-descriptions-item label="City">
                      {{ wizardData.address.city }}
                    </n-descriptions-item>
                    <n-descriptions-item label="State">
                      {{ wizardData.address.state }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Postal Code">
                      {{ wizardData.address.postalCode }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Country">
                      {{ getCountryName(wizardData.address.country) }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Address Type">
                      {{ wizardData.address.addressType }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-collapse-item>

                <n-collapse-item title="Professional Information" name="professional">
                  <n-descriptions :column="2" bordered>
                    <n-descriptions-item label="Company">
                      {{ wizardData.professional.company }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Job Title">
                      {{ wizardData.professional.jobTitle }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Department">
                      {{ wizardData.professional.department }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Experience">
                      {{ wizardData.professional.experience }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Skills">
                      {{ wizardData.professional.skills.join(', ') }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Salary Expectation">
                      ${{ wizardData.professional.salary.toLocaleString() }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-collapse-item>

                <n-collapse-item title="Additional Information" name="additional">
                  <n-descriptions :column="1" bordered>
                    <n-descriptions-item label="Bio">
                      {{ wizardData.additional.bio }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Hobbies">
                      {{ wizardData.additional.hobbies.join(', ') }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Languages">
                      {{ wizardData.additional.languages.join(', ') }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Work Preference">
                      {{ wizardData.additional.workPreference }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Available Start Date">
                      {{ formatDate(wizardData.additional.startDate) }}
                    </n-descriptions-item>
                  </n-descriptions>
                </n-collapse-item>
              </n-collapse>

              <n-alert type="info" title="Final Step">
                Please review all your information before submitting. You can go back to any step to make changes.
              </n-alert>
            </n-space>
          </div>
        </div>

        <!-- Wizard Navigation -->
        <div class="wizard-navigation">
          <n-space justify="space-between">
            <n-button
              v-if="currentStep > 1"
              @click="previousStep"
              :disabled="loading"
            >
              <template #icon>
                <n-icon :component="ChevronBackOutline" />
              </template>
              Previous
            </n-button>

            <div v-else></div>

            <n-space>
              <n-button
                v-if="currentStep < 5"
                type="primary"
                @click="nextStep"
                :loading="loading"
              >
                Next
                <template #icon>
                  <n-icon :component="ChevronForwardOutline" />
                </template>
              </n-button>

              <n-button
                v-if="currentStep === 5"
                type="primary"
                @click="submitWizard"
                :loading="loading"
              >
                <template #icon>
                  <n-icon :component="CheckmarkOutline" />
                </template>
                Submit Application
              </n-button>
            </n-space>
          </n-space>
        </div>
      </n-card>

      <!-- Progress Overview -->
      <n-card title="Progress Overview">
        <n-progress
          type="line"
          :percentage="progressPercentage"
          :status="stepStatus"
          :show-indicator="true"
        />
        <n-p style="margin-top: 8px; color: var(--text-secondary)">
          Step {{ currentStep }} of {{ steps.length }} - {{ progressPercentage }}% Complete
        </n-p>
      </n-card>

      <!-- Form Data Preview -->
      <n-card title="Complete Form Data">
        <n-code :code="JSON.stringify(wizardData, null, 2)" language="json" />
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useMessage } from 'naive-ui'
import {
  ChevronBackOutline,
  ChevronForwardOutline,
  CheckmarkOutline
} from '@vicons/ionicons5'

const message = useMessage()

// Wizard selection
const selectedWizard = ref('comprehensive')

// Simple wizard state
const simpleCurrentStep = ref(1)
const simpleStepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

// Medium wizard state
const mediumCurrentStep = ref(1)
const mediumStepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

// Form refs
const personalFormRef = ref()
const addressFormRef = ref()
const professionalFormRef = ref()
const additionalFormRef = ref()
const simpleAccountFormRef = ref()
const simpleProfileFormRef = ref()
const simplePreferencesFormRef = ref()
const mediumPersonalFormRef = ref()
const mediumExperienceFormRef = ref()
const mediumSkillsFormRef = ref()

// Wizard state
const currentStep = ref(1)
const loading = ref(false)
const stepStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

// Steps configuration
const steps = [
  { title: 'Personal', description: 'Basic personal information' },
  { title: 'Address', description: 'Contact and location details' },
  { title: 'Professional', description: 'Work and skills information' },
  { title: 'Additional', description: 'Extra details and preferences' },
  { title: 'Review', description: 'Review and submit' }
]

// Wizard data
const wizardData = reactive({
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: null,
    gender: ''
  },
  address: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressType: ''
  },
  professional: {
    company: '',
    jobTitle: '',
    department: '',
    experience: '',
    skills: [],
    salary: 50000
  },
  additional: {
    bio: '',
    hobbies: [],
    languages: [],
    workPreference: '',
    startDate: null,
    resume: []
  }
})

// Simple wizard data
const simpleWizardData = reactive({
  account: {
    username: '',
    email: '',
    password: ''
  },
  profile: {
    fullName: '',
    age: null,
    country: ''
  },
  preferences: {
    interests: [],
    newsletter: false,
    theme: ''
  }
})

// Medium wizard data
const mediumWizardData = reactive({
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  },
  experience: {
    currentCompany: '',
    jobTitle: '',
    yearsExperience: '',
    previousCompany: '',
    education: ''
  },
  skills: {
    languages: [],
    frameworks: [],
    experienceLevel: '',
    salary: 75000
  }
})

// Options
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' }
]

const departmentOptions = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'HR', value: 'hr' },
  { label: 'Finance', value: 'finance' }
]

const experienceOptions = [
  { label: '0-1 years', value: '0-1' },
  { label: '2-3 years', value: '2-3' },
  { label: '4-5 years', value: '4-5' },
  { label: '6-10 years', value: '6-10' },
  { label: '10+ years', value: '10+' }
]

const salaryMarks = {
  0: '0',
  50000: '50k',
  100000: '100k',
  150000: '150k',
  200000: '200k'
}

const simpleCountryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' }
]

const educationOptions = [
  { label: 'High School', value: 'high-school' },
  { label: 'Bachelor\'s Degree', value: 'bachelor' },
  { label: 'Master\'s Degree', value: 'master' },
  { label: 'PhD', value: 'phd' },
  { label: 'Other', value: 'other' }
]

const mediumSalaryMarks = {
  30000: '30k',
  60000: '60k',
  90000: '90k',
  120000: '120k',
  150000: '150k'
}

// Validation rules
const personalRules = {
  firstName: { required: true, message: 'First name is required' },
  lastName: { required: true, message: 'Last name is required' },
  email: {
    required: true,
    message: 'Valid email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { required: true, message: 'Phone number is required' },
  dob: { required: true, message: 'Date of birth is required' },
  gender: { required: true, message: 'Gender is required' }
}

const addressRules = {
  street: { required: true, message: 'Street address is required' },
  city: { required: true, message: 'City is required' },
  state: { required: true, message: 'State is required' },
  postalCode: { required: true, message: 'Postal code is required' },
  country: { required: true, message: 'Country is required' },
  addressType: { required: true, message: 'Address type is required' }
}

const professionalRules = {
  company: { required: true, message: 'Company is required' },
  jobTitle: { required: true, message: 'Job title is required' },
  department: { required: true, message: 'Department is required' },
  experience: { required: true, message: 'Experience is required' },
  skills: {
    required: true,
    type: 'array',
    min: 1,
    message: 'At least one skill is required'
  },
  salary: { required: true, message: 'Salary expectation is required' }
}

const additionalRules = {
  bio: {
    required: true,
    min: 10,
    message: 'Bio must be at least 10 characters'
  },
  hobbies: {
    required: true,
    type: 'array',
    min: 1,
    message: 'At least one hobby is required'
  },
  languages: {
    required: true,
    type: 'array',
    min: 1,
    message: 'At least one language is required'
  },
  workPreference: { required: true, message: 'Work preference is required' },
  startDate: { required: true, message: 'Start date is required' }
}

// Simple wizard validation rules
const simpleAccountRules = {
  username: { required: true, message: 'Username is required' },
  email: {
    required: true,
    message: 'Valid email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    min: 6,
    message: 'Password must be at least 6 characters'
  }
}

const simpleProfileRules = {
  fullName: { required: true, message: 'Full name is required' },
  age: {
    required: true,
    type: 'number',
    message: 'Age is required',
    min: 18
  },
  country: { required: true, message: 'Country is required' }
}

const simplePreferencesRules = {
  interests: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Select at least one interest'
  },
  theme: { required: true, message: 'Theme selection is required' }
}

// Medium wizard validation rules
const mediumPersonalRules = {
  firstName: { required: true, message: 'First name is required' },
  lastName: { required: true, message: 'Last name is required' },
  email: {
    required: true,
    message: 'Valid email is required',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { required: true, message: 'Phone number is required' },
  location: { required: true, message: 'Location is required' }
}

const mediumExperienceRules = {
  currentCompany: { required: true, message: 'Current company is required' },
  jobTitle: { required: true, message: 'Job title is required' },
  yearsExperience: { required: true, message: 'Experience level is required' },
  education: { required: true, message: 'Education is required' }
}

const mediumSkillsRules = {
  languages: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Select at least one language'
  },
  frameworks: {
    required: true,
    type: 'array',
    min: 1,
    message: 'Select at least one framework'
  },
  experienceLevel: { required: true, message: 'Experience level is required' },
  salary: { required: true, message: 'Salary expectation is required' }
}

// Computed
const progressPercentage = computed(() => {
  return Math.round((currentStep.value / steps.length) * 100)
})

// Methods
const validateCurrentStep = () => {
  const formRefs = {
    1: personalFormRef,
    2: addressFormRef,
    3: professionalFormRef,
    4: additionalFormRef
  }

  return new Promise((resolve) => {
    const formRef = formRefs[currentStep.value as keyof typeof formRefs]
    if (formRef.value) {
      formRef.value.validate((errors: any) => {
        resolve(!errors)
      })
    } else {
      resolve(true)
    }
  })
}

const nextStep = async () => {
  const isValid = await validateCurrentStep()
  if (isValid) {
    if (currentStep.value < steps.length) {
      currentStep.value++
      if (currentStep.value === steps.length) {
        stepStatus.value = 'finish'
      }
    }
  } else {
    message.error('Please fix the validation errors before proceeding')
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    stepStatus.value = 'process'
  }
}

const submitWizard = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    message.success('Application submitted successfully!')
    console.log('Wizard data:', wizardData)
    
    // Reset wizard after successful submission
    setTimeout(() => {
      resetWizard()
    }, 2000)
  } catch (error) {
    message.error('Failed to submit application')
    stepStatus.value = 'error'
  } finally {
    loading.value = false
  }
}

const resetWizard = () => {
  currentStep.value = 1
  stepStatus.value = 'process'
  
  // Reset all form data
  Object.assign(wizardData.personal, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: null,
    gender: ''
  })
  Object.assign(wizardData.address, {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressType: ''
  })
  Object.assign(wizardData.professional, {
    company: '',
    jobTitle: '',
    department: '',
    experience: '',
    skills: [],
    salary: 50000
  })
  Object.assign(wizardData.additional, {
    bio: '',
    hobbies: [],
    languages: [],
    workPreference: '',
    startDate: null,
    resume: []
  })
}

const formatDate = (date: number | null) => {
  if (!date) return 'Not specified'
  return new Date(date).toLocaleDateString()
}

const getCountryName = (countryCode: string) => {
  const country = countryOptions.find(c => c.value === countryCode)
  return country ? country.label : 'Not specified'
}

// Simple wizard methods
const simpleNextStep = async () => {
  const isValid = await validateSimpleStep()
  if (isValid) {
    if (simpleCurrentStep.value < 3) {
      simpleCurrentStep.value++
      if (simpleCurrentStep.value === 3) {
        simpleStepStatus.value = 'finish'
      }
    }
  } else {
    message.error('Please fix the validation errors before proceeding')
  }
}

const simplePreviousStep = () => {
  if (simpleCurrentStep.value > 1) {
    simpleCurrentStep.value--
    simpleStepStatus.value = 'process'
  }
}

const submitSimpleWizard = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    message.success('Registration completed successfully!')
    console.log('Simple wizard data:', simpleWizardData)
    
    setTimeout(() => {
      resetSimpleWizard()
    }, 1500)
  } catch (error) {
    message.error('Failed to submit registration')
    simpleStepStatus.value = 'error'
  } finally {
    loading.value = false
  }
}

const resetSimpleWizard = () => {
  simpleCurrentStep.value = 1
  simpleStepStatus.value = 'process'
  
  Object.assign(simpleWizardData.account, {
    username: '',
    email: '',
    password: ''
  })
  Object.assign(simpleWizardData.profile, {
    fullName: '',
    age: null,
    country: ''
  })
  Object.assign(simpleWizardData.preferences, {
    interests: [],
    newsletter: false,
    theme: ''
  })
}

const validateSimpleStep = () => {
  const formRefs = {
    1: simpleAccountFormRef,
    2: simpleProfileFormRef,
    3: simplePreferencesFormRef
  }

  return new Promise((resolve) => {
    const formRef = formRefs[simpleCurrentStep.value as keyof typeof formRefs]
    if (formRef.value) {
      formRef.value.validate((errors: any) => {
        resolve(!errors)
      })
    } else {
      resolve(true)
    }
  })
}

// Medium wizard methods
const mediumNextStep = async () => {
  const isValid = await validateMediumStep()
  if (isValid) {
    if (mediumCurrentStep.value < 4) {
      mediumCurrentStep.value++
      if (mediumCurrentStep.value === 4) {
        mediumStepStatus.value = 'finish'
      }
    }
  } else {
    message.error('Please fix the validation errors before proceeding')
  }
}

const mediumPreviousStep = () => {
  if (mediumCurrentStep.value > 1) {
    mediumCurrentStep.value--
    mediumStepStatus.value = 'process'
  }
}

const submitMediumWizard = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    message.success('Job application submitted successfully!')
    console.log('Medium wizard data:', mediumWizardData)
    
    setTimeout(() => {
      resetMediumWizard()
    }, 1500)
  } catch (error) {
    message.error('Failed to submit application')
    mediumStepStatus.value = 'error'
  } finally {
    loading.value = false
  }
}

const resetMediumWizard = () => {
  mediumCurrentStep.value = 1
  mediumStepStatus.value = 'process'
  
  Object.assign(mediumWizardData.personal, {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  })
  Object.assign(mediumWizardData.experience, {
    currentCompany: '',
    jobTitle: '',
    yearsExperience: '',
    previousCompany: '',
    education: ''
  })
  Object.assign(mediumWizardData.skills, {
    languages: [],
    frameworks: [],
    experienceLevel: '',
    salary: 75000
  })
}

const validateMediumStep = () => {
  const formRefs = {
    1: mediumPersonalFormRef,
    2: mediumExperienceFormRef,
    3: mediumSkillsFormRef
  }

  return new Promise((resolve) => {
    const formRef = formRefs[mediumCurrentStep.value as keyof typeof formRefs]
    if (formRef.value) {
      formRef.value.validate((errors: any) => {
        resolve(!errors)
      })
    } else {
      resolve(true)
    }
  })
}
</script>

<style scoped>
.form-wizard-demo {
  padding: 0;
}


.wizard-content {
  margin: 24px 0;
  min-height: 400px;
}

.step-content h3 {
  margin-bottom: 20px;
  color: var(--text-primary);
}

.wizard-navigation {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.n-code {
  max-height: 400px;
  overflow-y: auto;
}

.n-p {
  margin: 0;
}
</style>
