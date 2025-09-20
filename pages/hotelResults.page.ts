import { Page, Locator, expect } from '@playwright/test';
import { GuestScore, ResultsLayoutOption } from '../fixtures/enum';

export class HotelResultsPage {
  readonly page: Page;
  readonly resultsLayoutTrigger: Locator;
  readonly mapLayoutOption: (layoutOption: string) => Locator;
  readonly selectedLayoutOption: Locator;

  // Sliders
  readonly minPriceSlider: Locator;
  readonly maxPriceSlider: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resultsLayoutTrigger = page.locator('[data-testid="category(static_hotels)_search-results_layout-select_trigger"]');
    this.mapLayoutOption = (layoutOption: string) =>
      this.page.locator(`[data-testid="category(static_hotels)_search-results_layout-select_option(${layoutOption})"]`);
    this.selectedLayoutOption = this.resultsLayoutTrigger.locator('span span span');

    this.minPriceSlider = page.locator('[role="slider"]').first();
    this.maxPriceSlider = page.locator('[role="slider"]').nth(1);
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
    const sliderTrack = handle.locator('xpath=..'); // parent of handle
    const box = await sliderTrack.boundingBox();
    if (!box) throw new Error('Slider track not found');

    const min = Number(await handle.getAttribute('aria-valuemin') ?? 0);
    const max = Number(await handle.getAttribute('aria-valuemax') ?? 1000);

    // Calculate target X relative to track
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

}
