'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Guest } from '@/lib/types'
import {
  Plus,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  UserPlus,
  Unlink,
} from 'lucide-react'

type PlusOneRelationship = {
  primaryGuest: Guest
  plusOnes: Guest[]
}

type PlusOneRelationshipData = {
  primaryGuestId: string
  plusOneGuestId: string
}

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [plusOneRelationships, setPlusOneRelationships] = useState<
    PlusOneRelationshipData[]
  >([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPlusOneModal, setShowPlusOneModal] = useState(false)
  const [showPlusOnesView, setShowPlusOnesView] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [plusOneData, setPlusOneData] = useState({
    primaryGuestId: '',
    plusOneGuestId: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadGuests()
    loadPlusOneRelationships()
  }, [])

  const loadGuests = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/guests')
      const data = await response.json()
      setGuests(data.guests)
    } catch (error) {
      console.error('Error loading guests:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadPlusOneRelationships = async () => {
    try {
      const response = await fetch('/api/admin/plus-ones')
      const data = await response.json()
      setPlusOneRelationships(data.relationships || [])
    } catch (error) {
      console.error('Error loading plus-one relationships:', error)
    }
  }

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGuest),
      })

      if (response.ok) {
        setNewGuest({ firstName: '', lastName: '', email: '' })
        setShowAddModal(false)
        loadGuests()
      }
    } catch (error) {
      console.error('Error adding guest:', error)
    }
  }

  const handleUpdateGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGuest) return

    try {
      const response = await fetch(`/api/admin/guests/${selectedGuest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: selectedGuest.firstName,
          lastName: selectedGuest.lastName,
          email: selectedGuest.email,
        }),
      })

      if (response.ok) {
        setShowEditModal(false)
        setSelectedGuest(null)
        loadGuests()
      }
    } catch (error) {
      console.error('Error updating guest:', error)
    }
  }

  const handleDeleteGuest = async (guestId: string) => {
    if (!confirm('Are you sure you want to delete this guest?')) return

    try {
      const response = await fetch(`/api/admin/guests/${guestId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        loadGuests()
      }
    } catch (error) {
      console.error('Error deleting guest:', error)
    }
  }

  const handleLinkPlusOne = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/plus-ones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plusOneData),
      })

      if (response.ok) {
        setPlusOneData({ primaryGuestId: '', plusOneGuestId: '' })
        setShowPlusOneModal(false)
        loadGuests()
        alert('Plus-one relationship created successfully!')
      }
    } catch (error) {
      console.error('Error linking plus-one:', error)
    }
  }

  const handleUnlinkPlusOne = async (primaryId: string, plusOneId: string) => {
    if (!confirm('Are you sure you want to unlink this plus-one relationship?'))
      return

    try {
      const response = await fetch('/api/admin/plus-ones', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryGuestId: primaryId,
          plusOneGuestId: plusOneId,
        }),
      })

      if (response.ok) {
        loadGuests()
        loadPlusOneRelationships()
        alert('Plus-one relationship removed successfully!')
      }
    } catch (error) {
      console.error('Error unlinking plus-one:', error)
    }
  }

  // Get plus-ones for a specific guest
  const getPlusOnesForGuest = (guestId: string): Guest[] => {
    const plusOneIds = plusOneRelationships
      .filter((rel) => rel.primaryGuestId === guestId)
      .map((rel) => rel.plusOneGuestId)

    return guests.filter((g) => plusOneIds.includes(g.id))
  }

  // Check if guest is someone's plus-one
  const isGuestAPlusOne = (guestId: string): boolean => {
    return plusOneRelationships.some((rel) => rel.plusOneGuestId === guestId)
  }

  // Get primary guest for a plus-one
  const getPrimaryGuestForPlusOne = (plusOneId: string): Guest | null => {
    const relationship = plusOneRelationships.find(
      (rel) => rel.plusOneGuestId === plusOneId,
    )
    if (!relationship) return null
    return guests.find((g) => g.id === relationship.primaryGuestId) || null
  }

  const filteredGuests = guests.filter(
    (guest) =>
      guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = {
    total: guests.length,
    rsvped: guests.filter((g) => g.hasRsvped).length,
    attending: guests.filter((g) => g.isAttending === true).length,
    declined: guests.filter((g) => g.isAttending === false).length,
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Wedding RSVP Admin</h1>
            <p className="text-muted-foreground">
              Manage your guest list and RSVPs
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={!showPlusOnesView ? 'default' : 'outline'}
              onClick={() => setShowPlusOnesView(false)}
            >
              <Users className="w-4 h-4 mr-2" />
              Guest List
            </Button>
            <Button
              variant={showPlusOnesView ? 'default' : 'outline'}
              onClick={() => setShowPlusOnesView(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Plus-Ones
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Guests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                RSVP&apos;d
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.rsvped}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Attending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.attending}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Declined
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {stats.declined}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {!showPlusOnesView && (
          <>
            <div className="flex gap-3 mb-6">
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Guest
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPlusOneModal(true)}
              >
                <Users className="w-4 h-4 mr-2" />
                Link Plus-One
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search guests by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
          </>
        )}

        {/* Guest List View */}
        {!showPlusOnesView ? (
          <Card>
            <CardHeader>
              <CardTitle>Guest List</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-muted-foreground py-8">
                  Loading...
                </p>
              ) : filteredGuests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No guests found
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="pb-3 font-semibold">Name</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold text-center">
                          Status
                        </th>
                        <th className="pb-3 font-semibold text-center">
                          Housing
                        </th>
                        <th className="pb-3 font-semibold">Dietary</th>
                        <th className="pb-3 font-semibold text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGuests.map((guest) => (
                        <tr key={guest.id} className="border-b last:border-0">
                          <td className="py-3">
                            {guest.firstName} {guest.lastName}
                          </td>
                          <td className="py-3 text-muted-foreground">
                            {guest.email || '-'}
                          </td>
                          <td className="py-3 text-center">
                            {!guest.hasRsvped ? (
                              <span className="text-gray-400">Pending</span>
                            ) : guest.isAttending ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 text-center">
                            {guest.wantsOwnHousing ? (
                              <span className="text-sm text-muted-foreground">
                                Own
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                Provided
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-sm text-muted-foreground max-w-xs truncate">
                            {guest.dietaryRestrictions || '-'}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedGuest(guest)
                                  setShowEditModal(true)
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteGuest(guest.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Plus-Ones Management View */
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Plus-One Relationships</CardTitle>
                <Button onClick={() => setShowPlusOneModal(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Link Plus-One
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center text-muted-foreground py-8">
                  Loading...
                </p>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-l-4 border-l-accent">
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          Primary Guests
                        </div>
                        <div className="text-3xl font-bold">
                          {guests.filter((g) => !isGuestAPlusOne(g.id)).length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          Plus-Ones
                        </div>
                        <div className="text-3xl font-bold">
                          {plusOneRelationships.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-purple-500">
                      <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">
                          Unlinked Guests
                        </div>
                        <div className="text-3xl font-bold">
                          {
                            guests.filter(
                              (g) =>
                                !isGuestAPlusOne(g.id) &&
                                getPlusOnesForGuest(g.id).length === 0,
                            ).length
                          }
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      How Plus-Ones Work
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        Link guests together to create plus-one relationships.
                        Anyone in the group can search and RSVP on behalf of the
                        entire party.
                      </p>
                      <p>
                        <strong className="text-foreground">
                          Individual RSVPs:
                        </strong>{' '}
                        Each person can RSVP separately (attending or not) and
                        provide their own dietary restrictions.
                      </p>
                      <p>
                        <strong className="text-foreground">
                          Bidirectional Search:
                        </strong>{' '}
                        If a plus-one searches for their name, they&apos;ll
                        automatically see the entire group.
                      </p>
                    </div>
                  </div>

                  {/* Show all guests with their plus-ones */}
                  <div className="space-y-4">
                    {guests
                      .filter((guest) => !isGuestAPlusOne(guest.id)) // Only show primary guests
                      .map((guest) => {
                        const plusOnes = getPlusOnesForGuest(guest.id)
                        return (
                          <Card
                            key={guest.id}
                            className="border-l-4 border-l-accent/40"
                          >
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div>
                                      <h3 className="font-semibold text-lg">
                                        {guest.firstName} {guest.lastName}
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        {guest.email || 'No email'}
                                      </p>
                                    </div>
                                    {guest.hasRsvped && (
                                      <div className="ml-4">
                                        {guest.isAttending ? (
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                                            <CheckCircle className="w-3 h-3" />
                                            Attending
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">
                                            <XCircle className="w-3 h-3" />
                                            Declined
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Display plus-ones */}
                                  <div className="ml-6 space-y-2">
                                    {plusOnes.length > 0 ? (
                                      plusOnes.map((plusOne) => (
                                        <div
                                          key={plusOne.id}
                                          className="flex items-center justify-between bg-muted/30 rounded-lg p-3"
                                        >
                                          <div className="flex items-center gap-3">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                              <p className="text-sm font-medium">
                                                {plusOne.firstName}{' '}
                                                {plusOne.lastName}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                {plusOne.email || 'No email'}
                                              </p>
                                            </div>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              handleUnlinkPlusOne(
                                                guest.id,
                                                plusOne.id,
                                              )
                                            }
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                          >
                                            <Unlink className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-sm text-muted-foreground italic">
                                        No plus-ones linked yet.
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setPlusOneData({
                                      primaryGuestId: guest.id,
                                      plusOneGuestId: '',
                                    })
                                    setShowPlusOneModal(true)
                                  }}
                                >
                                  <UserPlus className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                  </div>

                  {guests.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No guests found. Add guests first to create plus-one
                      relationships.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add New Guest</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={newGuest.firstName}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={newGuest.lastName}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newGuest.email}
                    onChange={(e) =>
                      setNewGuest({ ...newGuest, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowAddModal(false)
                      setNewGuest({ firstName: '', lastName: '', email: '' })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Add Guest
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Guest Modal */}
      {showEditModal && selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Guest</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateGuest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="editFirstName">First Name *</Label>
                  <Input
                    id="editFirstName"
                    value={selectedGuest.firstName}
                    onChange={(e) =>
                      setSelectedGuest({
                        ...selectedGuest,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLastName">Last Name *</Label>
                  <Input
                    id="editLastName"
                    value={selectedGuest.lastName}
                    onChange={(e) =>
                      setSelectedGuest({
                        ...selectedGuest,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={selectedGuest.email || ''}
                    onChange={(e) =>
                      setSelectedGuest({
                        ...selectedGuest,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowEditModal(false)
                      setSelectedGuest(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Update Guest
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Link Plus-One Modal */}
      {showPlusOneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Link Plus-One</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLinkPlusOne} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryGuest">Primary Guest *</Label>
                  <select
                    id="primaryGuest"
                    value={plusOneData.primaryGuestId}
                    onChange={(e) =>
                      setPlusOneData({
                        ...plusOneData,
                        primaryGuestId: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-input bg-background px-4 py-2"
                  >
                    <option value="">Select guest...</option>
                    {guests
                      .filter((guest) => !isGuestAPlusOne(guest.id)) // Can't make a plus-one into a primary guest
                      .map((guest) => (
                        <option key={guest.id} value={guest.id}>
                          {guest.firstName} {guest.lastName}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plusOneGuest">Plus-One Guest *</Label>
                  <select
                    id="plusOneGuest"
                    value={plusOneData.plusOneGuestId}
                    onChange={(e) =>
                      setPlusOneData({
                        ...plusOneData,
                        plusOneGuestId: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-input bg-background px-4 py-2"
                  >
                    <option value="">Select guest...</option>
                    {guests
                      .filter(
                        (g) =>
                          g.id !== plusOneData.primaryGuestId &&
                          !isGuestAPlusOne(g.id) &&
                          !getPlusOnesForGuest(g.id).length, // Don't show guests who are already primary guests with plus-ones
                      )
                      .map((guest) => (
                        <option key={guest.id} value={guest.id}>
                          {guest.firstName} {guest.lastName}
                        </option>
                      ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Only available guests are shown (not already linked as
                    plus-ones)
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowPlusOneModal(false)
                      setPlusOneData({ primaryGuestId: '', plusOneGuestId: '' })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Link Plus-One
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
