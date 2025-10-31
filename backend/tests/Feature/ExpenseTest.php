<?php

use App\Enum\ExpenseCategory;
use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

pest()->use(RefreshDatabase::class);

beforeEach(function () {
    $this->expense1 = Expense::factory()->create([
        'category' => ExpenseCategory::FOOD,
    ]);

    $this->expense2 = Expense::factory()->create([
        'category' => ExpenseCategory::TRANSPORT,
    ]);

    $this->actingAsGuest();
});

it('can retrieve all expenses', function () {
    $response = $this->getJson('/api/expenses');

    $response->assertOk();

    $response->assertJsonCount(2, 'data');
});

it('can filter expenses by category', function () {
    $response = $this->getJson('/api/expenses?category=Food');

    $response->assertOk();
    $response->assertJsonCount(1, 'data');
    $response->assertJsonPath('data.0.category', 'Food');
});

it('can retrieve a single expense', function () {
    $response = $this->getJson("/api/expenses/{$this->expense1->id}");

    $response->assertOk();
    $response->assertJson(
        fn(AssertableJson $json) =>
        $json->where('data.id', $this->expense1->id)
            ->where('data.amount', (float) $this->expense1->amount)
            ->where('data.category', $this->expense1->category->value)
            ->where('data.description', $this->expense1->description)
            ->etc()
    );
});

it('returns 404 for a non-existent expense', function () {
    $response = $this->getJson('/api/expenses/999');

    $response->assertNotFound();
    $response->assertJson(['message' => 'Data not found.']);
});

it('can create a new expense', function () {
    $data = [
        'description' => 'New Coffee',
        'amount' => 5.75,
        'category' => 'Food',
    ];

    $response = $this->postJson('/api/expenses', $data);

    $response->assertCreated();
    $response->assertJson(
        fn(AssertableJson $json) =>
        $json->where('expense.amount', 5.75)
            ->where('expense.category', 'Food')
            ->etc()
    );

    $this->assertDatabaseHas('expenses', $data);
});

it('fails validation for missing data', function () {
    $data = [
        'description' => 'Missing amount and category',
    ];

    $response = $this->postJson('/api/expenses', $data);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['amount', 'category']);
});

it('fails validation for invalid category', function () {
    $data = [
        'description' => 'Vacation',
        'amount' => 500,
        'category' => 'Holiday',
    ];

    $response = $this->postJson('/api/expenses', $data);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['category']);
});

it('can update an existing expense', function () {
    $data = [
        'description' => 'Updated Lunch',
        'amount' => 30.00,
        'category' => $this->expense1->category->value,
    ];

    $response = $this->putJson("/api/expenses/{$this->expense1->id}", $data);

    $response->assertOk();
    $response->assertJsonPath('expense.description', 'Updated Lunch');

    $this->assertDatabaseHas('expenses', [
        'id' => $this->expense1->id,
        'description' => 'Updated Lunch',
    ]);
});

it('can delete an expense', function () {
    $expenseId = $this->expense1->id;

    $response = $this->deleteJson("/api/expenses/{$expenseId}");

    $response->assertOk();
    $response->assertJson(['message' => 'Expense deleted successfully']);

    $this->assertDatabaseMissing('expenses', ['id' => $expenseId]);
});

it('blocks requests after reaching the rate limit', function () {
    $limit = 100;

    for ($i = 0; $i < $limit; $i++) {
        $response = $this->getJson('/api/expenses');
        $response->assertOk();
    }

    $response = $this->getJson('/api/expenses');
    $response->assertTooManyRequests();
});
