<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Article;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudioFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /** @test */
    public function it_can_save_and_broadcast_an_article()
    {
        $response = $this->actingAs($this->user)->postJson('/articles', [
            'title' => 'Test Article',
            'content' => 'This is the test content of the article.',
            'is_published' => true,
            'is_editors_choice' => true,
            'tags' => ['tech', 'ai']
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('articles', [
            'title' => 'Test Article',
            'status' => 'published',
            'is_editors_choice' => true
        ]);
        
        $article = Article::first();
        $this->assertEquals(['tech', 'ai'], $article->tags);
    }

    /** @test */
    public function it_can_delete_an_article()
    {
        $article = Article::create([
            'title' => 'To Be Deleted',
            'content' => 'Content',
            'slug' => 'to-be-deleted'
        ]);

        $response = $this->actingAs($this->user)->deleteJson("/articles/{$article->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }

    /** @test */
    public function it_can_optimize_metadata_via_ai()
    {
        $response = $this->actingAs($this->user)->postJson('/api/generate-seo', [
            'content' => 'Artificial intelligence is transforming the software industry by automating repetitive tasks and providing intelligent insights for developers.'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['description', 'keywords']);
    }

    /** @test */
    public function it_can_architect_visual_prompt_via_ai()
    {
        $response = $this->actingAs($this->user)->postJson('/api/generate-image-prompt', [
            'content' => 'A futuristic cityscape with flying vehicles and neon-lit skyscrapers.'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['prompt']);
    }
}
