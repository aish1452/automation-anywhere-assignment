import { Page, expect } from '@playwright/test';

export class AutomationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // =========================================================
  // OPEN APPLICATION
  // =========================================================

  async openApplication() {
    await this.page.goto('/');

    await this.page.waitForLoadState('domcontentloaded');

    await expect(
      this.page.getByRole('link', {
        name: 'Automation',
        exact: true,
      })
    ).toBeVisible({
      timeout: 30000,
    });
  }

  // =========================================================
  // NAVIGATE TO AUTOMATION
  // =========================================================

  async navigateToAutomation() {
    const automationLink = this.page.getByRole('link', {
    name: 'Automation',
    exact: true,
  });

  await this.page
    .waitForLoadState('domcontentloaded')
    .catch(() => {});

  await expect(automationLink).toBeVisible({
    timeout: 60000,
  });

  await automationLink.click();

  await expect(this.page).toHaveURL(
    /#\/bots\/repository/,
    {
      timeout: 60000,
    }
  );
  
  }

  // =========================================================
  // OPEN CREATE MENU
  // =========================================================

  async openCreateMenu() {
    const createButton = this.page
      .locator('button[name="createOptions"]:visible')
      .first();

    await expect(createButton).toBeVisible({
      timeout: 30000,
    });

    await createButton.click();

    // Give the menu a moment to render.
    await this.page.waitForTimeout(1000);

    /*
     * Automation Anywhere's Create menu may expose
     * slightly different accessible names.
     *
     * Find the visible menu item containing "Task Bot".
     */
    const taskBot = this.page
      .locator('button:visible')
      .filter({
        hasText: 'Task Bot',
      })
      .first();

    await expect(taskBot).toBeVisible({
      timeout: 15000,
    });
  }

  // =========================================================
  // SELECT TASK BOT
  // =========================================================

  async selectTaskBot() {
    const taskBot = this.page
      .locator('button:visible')
      .filter({
        hasText: 'Task Bot',
      })
      .first();

    await expect(taskBot).toBeVisible({
      timeout: 15000,
    });

    await taskBot.click();
  }

  // =========================================================
  // CREATE TASK BOT
  // =========================================================

  async createTaskBot(name: string) {
    const botNameInput = this.page.getByRole(
      'textbox',
      {
        name: 'name',
      }
    );

    await expect(botNameInput).toBeVisible({
      timeout: 30000,
    });

    await botNameInput.fill(name);

    const createAndEditButton =
      this.page.getByRole('button', {
        name: 'Create & edit',
        exact: true,
      });

    await expect(createAndEditButton).toBeVisible({
      timeout: 30000,
    });

    await createAndEditButton.click();

    // Wait for editor.
    await expect(
      this.page.getByPlaceholder('Search actions')
    ).toBeVisible({
      timeout: 60000,
    });
  }

  // =========================================================
  // SEARCH MESSAGE BOX
  // =========================================================

  async searchForMessageBox() {
    const actionSearch =
      this.page.getByPlaceholder('Search actions');

    await expect(actionSearch).toBeVisible({
      timeout: 30000,
    });

    await actionSearch.fill('mess');

    const outerMessageBox =
      this.page
        .locator('.editor-palette-group__label')
        .filter({
          hasText: 'Message box',
        })
        .first();

    await expect(outerMessageBox).toBeVisible({
      timeout: 30000,
    });
  }

  // =========================================================
  // OPEN MESSAGE BOX CATEGORY
  // =========================================================

  async openMessageBoxCategory() {
    const outerMessageBox =
      this.page
        .locator('.editor-palette-group__label')
        .filter({
          hasText: 'Message box',
        })
        .first();

    await expect(outerMessageBox).toBeVisible({
      timeout: 15000,
    });

    /*
     * FIRST CLICK:
     * Expand Message box category.
     */
    await outerMessageBox.click();

    const innerMessageBox =
      this.page
        .locator(
          '.editor-palette-item__child-label'
        )
        .filter({
          hasText: 'Message box',
        })
        .last();

    await expect(innerMessageBox).toBeVisible({
      timeout: 15000,
    });
  }

  // =========================================================
  // DOUBLE CLICK INNER MESSAGE BOX
  // =========================================================

  async addMessageBox() {
    const innerMessageBox =
      this.page
        .locator(
          '.editor-palette-item__child-label'
        )
        .filter({
          hasText: 'Message box',
        })
        .last();

    await expect(innerMessageBox).toBeVisible({
      timeout: 15000,
    });

    await innerMessageBox.scrollIntoViewIfNeeded();

    /*
     * SECOND ACTION:
     * Double-click INNER Message box.
     */
    await innerMessageBox.dblclick({
      delay: 150,
    });

    const titleField = this.page.locator(
      '[role="textbox"][name="title"][contenteditable="true"]'
    );

    const messageField = this.page.locator(
      '[role="textbox"][name="content"][contenteditable="true"]'
    );

    await expect(titleField).toBeVisible({
      timeout: 30000,
    });

    await expect(messageField).toBeVisible({
      timeout: 30000,
    });
  }

  // =========================================================
  // CONFIGURE MESSAGE BOX
  // =========================================================

  async configureMessageBox(
    title: string,
    message: string
  ) {
    const titleField = this.page.locator(
      '[role="textbox"][name="title"][contenteditable="true"]'
    );

    const messageField = this.page.locator(
      '[role="textbox"][name="content"][contenteditable="true"]'
    );

    // Title
    await expect(titleField).toBeVisible({
      timeout: 15000,
    });

    await titleField.fill(title);

    await expect(titleField).toHaveText(title, {
      timeout: 10000,
    });

    // Message
    await expect(messageField).toBeVisible({
      timeout: 15000,
    });

    await messageField.fill(message);

    await expect(messageField).toHaveText(message, {
      timeout: 10000,
    });
  }

  // =========================================================
  // SAVE
  // =========================================================

  async save() {
    const saveButton = this.page.getByRole(
      'button',
      {
        name: 'Save',
        exact: true,
      }
    );

    await expect(saveButton).toBeVisible({
      timeout: 15000,
    });

    await saveButton.click();
  }

  // =========================================================
  // UC2 - SELECT FORM
  // =========================================================

  async selectForm() {
     const formOption = this.page
    .locator('button:visible')
    .filter({
      hasText: 'Form',
    })
    .first();

  await expect(formOption).toBeVisible({
    timeout: 15000,
  });

  await formOption.click();

  // The Create Form dialog contains the Name field.
  // This is a more reliable confirmation than the dialog heading.
  await expect(
    this.page.locator('input[name="name"]')
  ).toBeVisible({
    timeout: 15000,
  });

  }
  // =========================================================
// UC2 - CREATE FORM
// =========================================================

async createForm(
  name: string,
  description: string
) {
  const formNameInput = this.page.locator(
    'input[name="name"]'
  );

  const descriptionInput = this.page.locator(
    'input[name="description"]'
  );

  const createAndEditButton = this.page.getByRole(
    'button',
    {
      name: 'Create & edit',
      exact: true,
    }
  );

  await expect(formNameInput).toBeVisible({
    timeout: 15000,
  });

  await formNameInput.fill(name);

  await expect(descriptionInput).toBeVisible({
    timeout: 15000,
  });

  await descriptionInput.fill(description);

  await expect(createAndEditButton).toBeVisible({
    timeout: 15000,
  });

  await createAndEditButton.click();

  // Automation Anywhere is a SPA.
  // Wait for the URL to change to the Form Designer route
  // without waiting for a traditional "load" navigation.
  await expect
    .poll(
      () => this.page.url(),
      {
        timeout: 60000,
        message: 'Waiting for Form Designer URL',
      }
    )
    .toMatch(
      /\/bots\/repository\/private\/files\/\d+\/module\/attended\/form\/edit/
    );

  console.log(
    'FORM DESIGNER URL:',
    this.page.url()
  );
}
async addTextBox() {
  console.log('=== ADD TEXT BOX ===');
  console.log('URL:', this.page.url());

  console.log('VIEWPORT:', this.page.viewportSize());

  console.log(
    'INNER WIDTH:',
    await this.page.evaluate(() => window.innerWidth)
  );

  console.log(
    'INNER HEIGHT:',
    await this.page.evaluate(() => window.innerHeight)
  );

  console.log(
    'DEVICE PIXEL RATIO:',
    await this.page.evaluate(() => window.devicePixelRatio)
  );

  await this.page.screenshot({
    path: 'form-designer-debug.png',
    fullPage: true,
  });

  const textBox = this.page.locator(
    'span[data-path="ClippedText"][data-text="Text Box"]'
  );

  // Wait for the Form Designer to render the Text Box.
  await textBox.waitFor({
    state: 'attached',
    timeout: 60000,
  });

  console.log('TEXT BOX FOUND');

  await textBox.waitFor({
    state: 'visible',
    timeout: 30000,
  });

  console.log('TEXT BOX VISIBLE');

  const textBoxButton = textBox.locator(
    'xpath=ancestor::button'
  );

  await textBoxButton.waitFor({
    state: 'visible',
    timeout: 15000,
  });

  console.log('TEXT BOX BUTTON FOUND');

  await textBoxButton.dblclick({
    delay: 150,
  });

  console.log('TEXT BOX ADDED');
}
async addSecondTextBox() {
  const elementsList = this.page
    .locator('[data-path="EditorPalette.section.list"]')
    .first();

  await expect(elementsList).toBeAttached({
    timeout: 30000,
  });

  // Scroll the Elements palette to the bottom
  await elementsList.evaluate((element) => {
    const scroller =
      element.querySelector('[data-scroller="true"]') ||
      element.parentElement;

    if (scroller) {
      (scroller as HTMLElement).scrollTop =
        (scroller as HTMLElement).scrollHeight;
    }
  });

  const textBoxLabel = this.page
    .locator(
      'span[data-path="ClippedText"][data-text="Text Box"]'
    )
    .last();

  await expect(textBoxLabel).toBeVisible({
    timeout: 30000,
  });

  const textBoxButton = textBoxLabel.locator(
    'xpath=ancestor::button'
  );

  await expect(textBoxButton).toBeVisible({
    timeout: 15000,
  });

  await textBoxButton.dblclick({
    delay: 150,
  });
}
}