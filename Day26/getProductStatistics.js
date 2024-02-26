const Product = require('./Product');

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
async function getProductStatistics() {
  try {
    const statistics = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          highestQuantity: { $max: '$quantity' }
        }
      }
    ]);

    if (statistics.length === 0) {
      // No products found
      return {
        totalProducts: 0,
        averagePrice: 0,
        highestQuantity: 0
      };
    }

    // Return the first element of the statistics array
    return statistics[0];
  } catch (error) {
    throw new Error(`Failed to calculate product statistics: ${error.message}`);
  }
}

module.exports = getProductStatistics;
