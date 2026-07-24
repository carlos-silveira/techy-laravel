<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Article;
use App\Models\Category;
use App\Models\Subscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudioCmsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function studio_dashboard_requires_authentication()
    {
        $response = $this->get('/studio');
        $response->assertRedirect('/login');
    }

    /** @test */
    public function authenticated_user_can_access_studio_dashboard()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/studio');
        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_access_all_studio_sections()
    {
        $user = User::factory()->create();

        $sections = [
            '/studio/articles',
            '/studio/articles/create',
            '/studio/analytics',
            '/studio/media',
            '/studio/subscribers',
            '/studio/categories',
            '/studio/settings',
            '/studio/scout',
            '/studio/factcheck',
            '/studio/eeat',
            '/studio/agent',
            '/studio/observability',
        ];

        foreach ($sections as $section) {
            $response = $this->actingAs($user)->get($section);
            $response->assertStatus(200);
        }
    }

    /** @test */
    public function user_can_create_and_delete_category()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/studio/categories', [
            'name' => 'Artificial Intelligence',
            'description' => 'AI news and breakthroughs',
            'color' => '#00b4ff',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('categories', [
            'name' => 'Artificial Intelligence',
            'slug' => 'artificial-intelligence',
        ]);

        $category = Category::first();
        $deleteResponse = $this->actingAs($user)->delete("/studio/categories/{$category->id}");
        $deleteResponse->assertRedirect();
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
