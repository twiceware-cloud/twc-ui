<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ContactFactory extends Factory
{
    protected $model = Contact::class;

    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'is_vip' => $this->faker->boolean(),
            'dob' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['m', 'f']),
            'country_id' => $this->faker->numberBetween(1, 250),
            'note' => $this->faker->text(),
            'hourly' => $this->faker->randomFloat(2, 0, 100),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
