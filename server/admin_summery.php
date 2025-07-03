<?php
header('Content-Type: application/json');
include 'connection.php'; // Adjust the path if needed

$response = [];

try {
    // Count total users
    $userQuery = "SELECT COUNT(*) as total_users FROM users";
    $userResult = mysqli_query($conn, $userQuery);
    $response['total_users'] = mysqli_fetch_assoc($userResult)['total_users'];

    // Count total sketches
    $sketchQuery = "SELECT COUNT(*) as total_sketches FROM images_path";
    $sketchResult = mysqli_query($conn, $sketchQuery);
    $response['total_sketches'] = mysqli_fetch_assoc($sketchResult)['total_sketches'];

    // Count total cart items
    $cartQuery = "SELECT COUNT(*) as total_cart_items FROM cart";
    $cartResult = mysqli_query($conn, $cartQuery);
    $response['total_cart_items'] = mysqli_fetch_assoc($cartResult)['total_cart_items'];

    // Count total wishlist items
    $wishlistQuery = "SELECT COUNT(*) as total_wishlist_items FROM wishlist";
    $wishlistResult = mysqli_query($conn, $wishlistQuery);
    $response['total_wishlist_items'] = mysqli_fetch_assoc($wishlistResult)['total_wishlist_items'];

    // Count total orders
    $ordersQuery = "SELECT COUNT(*) as total_orders FROM orders";
    $ordersResult = mysqli_query($conn, $ordersQuery);
    $response['total_orders'] = mysqli_fetch_assoc($ordersResult)['total_orders'];

    // Calculate total purchases (sum of all order amounts)
    $purchaseQuery = "SELECT SUM(total_amount) as total_purchases FROM orders";
    $purchaseResult = mysqli_query($conn, $purchaseQuery);
    $totalPurchases = mysqli_fetch_assoc($purchaseResult)['total_purchases'];
    $response['total_purchases'] = $totalPurchases ? $totalPurchases : 0;

    echo json_encode($response);
} catch (Exception $e) {
    echo json_encode(['error' => 'Something went wrong.']);
}
?>
