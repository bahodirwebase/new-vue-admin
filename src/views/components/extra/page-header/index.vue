<template>
  <div class="ui-page">
    <n-space vertical :size="24">
      <div class="page-header">
        <h1 class="page-title">Page Header</h1>
        <p class="page-subtitle">Comprehensive page headers with navigation, breadcrumbs, and actions</p>
      </div>
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="Basic Headers">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Simple Header</h3>
                <n-page-header title="Page Title" subtitle="Page description or subtitle">
                  <template #extra>
                    <n-button type="primary">Action</n-button>
                  </template>
                </n-page-header>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">With Back Button</h3>
                <n-page-header title="Detail Page" subtitle="Viewing detailed information" :show-back="true"
                  @back="handleBack">
                  <template #extra>
                    <n-space>
                      <n-button>Cancel</n-button>
                      <n-button type="primary">Save</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>

          <n-card title="Headers with Breadcrumbs">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Breadcrumb Navigation</h3>
                <n-page-header title="Product Details" subtitle="View and manage product information"
                  :breadcrumb="breadcrumb1">
                  <template #extra>
                    <n-button type="primary">Edit Product</n-button>
                  </template>
                </n-page-header>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Deep Breadcrumb Path</h3>
                <n-page-header title="Settings" subtitle="Application configuration" :breadcrumb="breadcrumb2">
                  <template #extra>
                    <n-space>
                      <n-button>Reset</n-button>
                      <n-button type="primary">Save Changes</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>

          <n-card title="Headers with Avatar">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">User Profile Header</h3>
                <n-page-header title="John Doe" subtitle="Senior Developer" :avatar="avatar1">
                  <template #extra>
                    <n-space>
                      <n-button>Message</n-button>
                      <n-button type="primary">Follow</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Company Header</h3>
                <n-page-header title="Tech Company Inc." subtitle="Software Development & Consulting" :avatar="avatar2">
                  <template #extra>
                    <n-space>
                      <n-button>View Website</n-button>
                      <n-button type="primary">Contact</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>

          <n-card title="Headers with Tags">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Status Tags</h3>
                <n-page-header title="Project Alpha" subtitle="New feature development project" :tag="tag1">
                  <template #extra>
                    <n-space>
                      <n-button>View Details</n-button>
                      <n-button type="primary">Edit Project</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Multiple Tags</h3>
                <n-page-header title="Documentation Site" subtitle="Comprehensive documentation platform">
                  <template #extra>
                    <n-space>
                      <n-tag type="success" size="small">Live</n-tag>
                      <n-tag type="info" size="small">v2.0</n-tag>
                      <n-button type="primary">Manage</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Custom Content">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Custom Header Content</h3>
                <n-page-header title="Dashboard" subtitle="Analytics and monitoring">
                  <template #header>
                    <n-space align="center" :size="16">
                      <n-icon size="24" color="#2080f0">
                        <Grid />
                      </n-icon>
                      <div>
                        <div style="font-size: 20px; font-weight: 600; color: var(--text-primary)">Analytics Dashboard
                        </div>
                        <div style="color: var(--text-secondary)">Real-time data monitoring</div>
                      </div>
                    </n-space>
                  </template>
                  <template #extra>
                    <n-space>
                      <n-button secondary>Export</n-button>
                      <n-button type="primary">New Report</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">With Statistics</h3>
                <n-page-header title="Sales Report" subtitle="Monthly performance overview">
                  <template #extra>
                    <n-space>
                      <n-statistic label="Total Sales" value="125,430" />
                      <n-statistic label="Growth" value="+23.5%" />
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>

          <n-card title="Footer Content">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">With Additional Information</h3>
                <n-page-header title="Blog Post" subtitle="Latest article and updates" :breadcrumb="breadcrumb3">
                  <template #extra>
                    <n-space>
                      <n-button>Preview</n-button>
                      <n-button type="primary">Publish</n-button>
                    </n-space>
                  </template>
                  <template #footer>
                    <n-space :size="24">
                      <n-space align="center" :size="8">
                        <n-icon size="16">
                          <Time />
                        </n-icon>
                        <span style="color: var(--text-secondary)">Last updated 2 hours ago</span>
                      </n-space>
                      <n-space align="center" :size="8">
                        <n-icon size="16">
                          <Person />
                        </n-icon>
                        <span style="color: var(--text-secondary)">By John Doe</span>
                      </n-space>
                      <n-space align="center" :size="8">
                        <n-icon size="16">
                          <Eye />
                        </n-icon>
                        <span style="color: var(--text-secondary)">1,234 views</span>
                      </n-space>
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>

          <n-card title="Real-world Examples">
            <n-space vertical :size="16">
              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">E-commerce Product</h3>
                <n-page-header title="Premium Headphones" subtitle="Wireless noise-cancelling headphones"
                  :breadcrumb="breadcrumb4" :avatar="productAvatar">
                  <template #extra>
                    <n-space>
                      <n-tag type="success">In Stock</n-tag>
                      <n-button secondary>Add to Wishlist</n-button>
                      <n-button type="primary">Add to Cart</n-button>
                    </n-space>
                  </template>
                </n-page-header>
              </div>

              <div>
                <h3 style="margin-bottom: 12px; color: var(--text-primary)">Document Editor</h3>
                <n-page-header title="Q4 Marketing Strategy.docx" subtitle="Last edited by Sarah Wilson"
                  :show-back="true">
                  <template #extra>
                    <n-space>
                      <n-button secondary>Share</n-button>
                      <n-button secondary>Download</n-button>
                      <n-button type="primary">Edit</n-button>
                    </n-space>
                  </template>
                  <template #footer>
                    <n-space :size="24">
                      <n-space align="center" :size="8">
                        <span style="color: var(--text-secondary)">Size: 2.4 MB</span>
                      </n-space>
                      <n-space align="center" :size="8">
                        <span style="color: var(--text-secondary)">Modified: Oct 15, 2024</span>
                      </n-space>
                      <n-space align="center" :size="8">
                        <span style="color: var(--text-secondary)">Words: 5,432</span>
                      </n-space>
                    </n-space>
                  </template>
                </n-page-header>
              </div>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NPageHeader, NSpace, NCard, NButton, NTag, NIcon, NStatistic } from 'naive-ui'
import { Grid, Time, Person, Eye } from '@vicons/ionicons5'
import { ref } from 'vue'

const handleBack = () => {
  console.log('Back button clicked')
}

const breadcrumb1 = ref({
  items: [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Details' }
  ]
})

const breadcrumb2 = ref({
  items: [
    { label: 'Home', href: '#' },
    { label: 'Admin', href: '#' },
    { label: 'System', href: '#' },
    { label: 'Settings' }
  ]
})

const breadcrumb3 = ref({
  items: [
    { label: 'Blog', href: '#' },
    { label: 'Technology', href: '#' },
    { label: 'Web Development' }
  ]
})

const breadcrumb4 = ref({
  items: [
    { label: 'Home', href: '#' },
    { label: 'Electronics', href: '#' },
    { label: 'Audio', href: '#' },
    { label: 'Headphones' }
  ]
})

const avatar1 = ref({
  src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  round: true
})

const avatar2 = ref({
  src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  round: false
})

const productAvatar = ref({
  src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  round: false
})

const tag1 = ref({
  type: 'warning',
  content: 'In Progress'
})
</script>

<style scoped>

.page-title {
  font-family: var(--font-secondary);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
}

</style>
