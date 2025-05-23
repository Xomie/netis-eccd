<?php

namespace App\Models;

use App\Models\ChildProfile;
use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    protected $fillable = [
        'name',
        'address',
        'barangay_captain',
        'logo',
        'cdc_name'
    ];
    public function childProfiles()
    {
        return $this->hasMany(ChildProfile::class);
    }
}
