<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Events extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'event_date',
        'location',
        'image',
        'related_link',
        'is_active',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            $baseSlug = Str::slug($event->title);
            $slug = $baseSlug;
            $i = 1;

            while (static::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $i++;
            }

            $event->slug = $slug;
        });

        static::updating(function ($event) {
            $baseSlug = Str::slug($event->title);
            $slug = $baseSlug;
            $i = 1;

            while (
                static::where('slug', $slug)
                ->where('id', '!=', $event->id)
                ->exists()
            ) {
                $slug = $baseSlug . '-' . $i++;
            }

            $event->slug = $slug;
        });
    }
}
