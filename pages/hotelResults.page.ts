import { Page, Locator, expect } from '@playwright/test';
import { GuestScore, ResultsLayoutOption } from '../fixtures/enum';
import { BasePage } from './base.page';

export class HotelResultsPage extends BasePage {
  readonly resultsLayoutTrigger: Locator;
  readonly mapLayoutOption: (layoutOption: string) => Locator;
  readonly minPriceSlider: Locator;
  readonly maxPriceSlider: Locator;
  readonly mapContainer: Locator;
  readonly hotelMarkers: Locator;
  readonly hotelCard: Locator;
  readonly hotelCardLabelTotalPriceSpan: Locator;
  readonly hotelCardGuestScoreLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.resultsLayoutTrigger = page.locator('[data-testid="category(static_hotels)_search-results_layout-select_trigger"]');
    this.mapLayoutOption = (layoutOption: string) =>
      this.page.locator(`[data-testid="category(static_hotels)_search-results_layout-select_option(${layoutOption})"]`);

    this.minPriceSlider = page.locator('[role="slider"]').first();
    this.maxPriceSlider = page.locator('[role="slider"]').nth(1);
    this.mapContainer = page.locator('[data-testid="map"]');
    this.hotelMarkers = page.locator('gmp-advanced-marker');
    this.hotelCard = page.locator('article');
    this.hotelCardLabelTotalPriceSpan = this.hotelCard.locator('span', { hasText: 'Total' }).locator('xpath=following-sibling::span');
    this.hotelCardGuestScoreLabel = this.hotelCard.locator('div[class*="[grid-area:rating-label]"]');
  }

  /**
   * Selects the results layout option on the hotel results page.
   *
   * @param layoutOption The layout to apply to the results.
   *                     Must be one of the values from {@link ResultsLayoutOption}
   *                     located in `fixture/enum.ts`:
   *                     - ResultsLayoutOption.GRID
   *                     - ResultsLayoutOption.LIST
   *                     - ResultsLayoutOption.MAP
   *
   * Example usage:
   * ```ts
   * import { ResultsLayoutOption } from '../fixture/enum';
   * await hotelResultsPage.selectResultsLayout(ResultsLayoutOption.GRID);
   * ```
   */
  async selectResultsLayout(layoutOption: ResultsLayoutOption) {
    await this.resultsLayoutTrigger.click();
    await this.mapLayoutOption(layoutOption).click();
    await expect(this.resultsLayoutTrigger).toHaveText(new RegExp(layoutOption, 'i'));
  }

  /**
   * Sets the price range by dragging Mantine slider handles along the track.
   *
   * @param minValue Minimum price to set.
   * @param maxValue Maximum price to set.
   *
   * Usage:
   * await hotelResultsPage.setPriceRange(100, 1000);
   */
  async setPriceRange(minValue: number, maxValue: number) {
    await this.dragSlider(this.minPriceSlider, minValue);
    await this.dragSlider(this.maxPriceSlider, maxValue);
  }

  /**
   * Private helper to drag a Mantine slider handle to a target value.
   *
   * @param handle Locator for the slider handle.
   * @param target Target value to set.
   */
  private async dragSlider(handle: Locator, target: number) {
    const sliderTrack = handle.locator('xpath=..');
    const box = await sliderTrack.boundingBox();
    if (!box) throw new Error('Slider track not found');

    const min = Number(await handle.getAttribute('aria-valuemin') ?? 0);
    const max = Number(await handle.getAttribute('aria-valuemax') ?? 1000);

    const x = box.x + ((target - min) / (max - min)) * box.width;
    const y = box.y + box.height / 2;

    await this.page.mouse.move(box.x, y);
    await this.page.mouse.down();
    await this.page.mouse.move(x, y, { steps: 15 });
    await this.page.mouse.up();

    await expect(handle).toHaveAttribute('aria-valuenow', target.toString(), { timeout: 5000 });
  }

  /**
 * Sets the guest score filter on the left panel.
 *
 * @param score One of the values from {@link GuestScore}.
 *
 * Usage:
 * await hotelResultsPage.setGuestScore(GuestScore.VERY_GOOD);
 */
async setGuestScore(score: GuestScore) {
  const checkbox = this.page.getByLabel(score);
  await checkbox.check();
  await expect(checkbox).toBeChecked();
}

  /**
   * Zooms in on the map by sending '+' key presses.
   *
   * @param times Number of zoom-in key presses. Default is 1.
   */
  async zoomInMap(times: number = 1) {
    await this.mapContainer.click({ position: { x: 100, y: 100 } });
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press('+');
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Selects a hotel marker on the map.
   *
   * @param hotelName Optional: hotel name to select. If omitted, selects the first hotel.
   */
  async selectHotelOnMap(hotelName?: string) {
    if (hotelName) {
      await this.page.getByRole('button', { name: hotelName }).click();
    } else {
      await this.hotelMarkers.first().click();
    }
  }

  async verifyHotelCardPrice(minPrice: number, maxPrice: number){
    const totalPriceText = await this.hotelCardLabelTotalPriceSpan.textContent();
    if (!totalPriceText) throw new Error('Total price not found');
    const total = Number(totalPriceText.replace(/[^0-9]/g, ''));
    if (total < minPrice || total > maxPrice) {
      throw new Error(`Hotel total price ${total} is outside filter range ${minPrice}-${maxPrice}`);
    }    
  }

  async verifyHotelCardGuestScore(expectedScore: GuestScore){
    const mainText = expectedScore.split('(')[0].trim();
    await expect(this.hotelCardGuestScoreLabel).toContainText(mainText);
  }

  /**
   * Wait for hotel results to load
   */
  async waitForResultsToLoad() {
    await this.hotelCard.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  /**
   * Get the number of hotel cards displayed
   */
  async getHotelCount(): Promise<number> {
    return await this.hotelCard.count();
  }


  /**
   * Verify that results are displayed
   */
  async verifyResultsDisplayed() {
    await expect(this.hotelCard.first()).toBeVisible();
    await expect(this.resultsLayoutTrigger).toBeVisible();
  }
}
