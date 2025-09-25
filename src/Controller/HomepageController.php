<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomepageController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function index(): Response
    {

        $testArray = [
            "a",
            "b",
            "c",
            "d",
            "e",
        ];

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
            'test' => $testArray
        ]);
    }

    #[Route('/home-data', name: 'api_home', methods: ['GET'])]
    public function homeData(): JsonResponse
    {
        $testArray = [
            ['id' => 1, 'name' => 'Alice'],
            ['id' => 2, 'name' => 'Bob'],
            ['id' => 3, 'name' => 'Charlie'],
        ];

        return $this->json($testArray);
    }
}
