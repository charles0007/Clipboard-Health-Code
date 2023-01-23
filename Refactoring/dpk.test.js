
const { deterministicPartitionkey } = require('./dpk');

describe('deterministicPartitionkey', () => {
    it('should return the partition key if it is a string and is shorter than 256 characters', () => {
        const event = { partitionkey: 'abc' };
        expect(deterministicPartitionkey(event)).toBe('abc');
    });

    it('should return a hash if the partition key is longer than 256 characters', () => {
        const longKey = 'a'.repeat(257);
        const event = { partitionkey: longKey };
        expect(deterministicPartitionkey(event)).toBe(hash(longKey));
    });

    it('should return a hash if the partition key is not a string', () => {
        const event = { partitionkey: { key: 'value' } };
        expect(deterministicPartitionkey(event)).toBe(hash(JSON.stringify({ key: 'value' })));
    });

    it('should return trivial partition key if event does not have partition key', () => {
        expect(deterministicPartitionkey({})).toBe(TRIVIAL_PARTITION_KEY);
    });
});